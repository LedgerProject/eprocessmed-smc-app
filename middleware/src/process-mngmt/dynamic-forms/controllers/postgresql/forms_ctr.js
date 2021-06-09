const request = require("request");
const generatorRequest = require('../../../../general/global/functions/generator_request');
const { urlSrv, urls, hdJson } = require('../../../../general/global/data/global_data');
const url = `${urlSrv}${urls.genQuerySrv}`;
const fromsCtr = {};
var collector = [];

// Encadenar los datos para los "fetch", compatibles con JSON
const strgf = (obj) => {
  const str = JSON.stringify(obj);
  return str;
}

const prepareLog = (dataLog) => {
  const date = new Date();
  dataLog['date'] = date;
  const log = JSON.stringify(dataLog);
  saveLogs(log);
}

const sedrequest = async (dataReq) => {
  let prepareData = '';
  if (dataReq.prepareData !== undefined) {
    prepareData = dataReq.prepareData;
  }
  const objDta = [{
    params: dataReq.data,
    where: {}
  }];
  dataReq.data = objDta;
  const queryData = strgf(dataReq);
  const setQuery = { prepareData, process: dataReq.process, input: null, ouput: dataReq.request, url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
  const reqSelet = [setQuery];
  const requests = [];



  const resp = await generatorRequest(reqSelet, requests, collector)
    .then((resp) => { return resp })
    .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '34', data: '', err }));

  return resp;

}

const currentCustomerForms = async (data) => {
  const dataReq = {
    request: "current-cust-forms",
    data: [data]
  };
  const respQry = await sedrequest(dataReq);
  const currtCustForms = respQry.find(qry => qry.ouput === dataReq.request);
  return currtCustForms.answer;
}

const getPatientForms = async (idRespondents) => {
  const dataReq = {
    request: "frmdata-by-id",
    data: [{
      idRespondents
    }]
  };
  const respQry = await sedrequest(dataReq);
  const currtPatForms = respQry.find(qry => qry.ouput === dataReq.request);
  return currtPatForms.answer;
}

// SELECT id_respondents, id_custf, creation_date FROM public.forms_data WHERE id_respondents = idRespondents AND id_custf = ANY (array[0,1,2,3,4,5,6]);
const validateOneTime = async (oneTime, patientForms) => {
  if (patientForms.length > 0) {
    patientForms.forEach(formPatient => {
      oneTime = oneTime.filter(form => form.id_custf !== parseInt(formPatient.id_custf));
    });
  }
  return oneTime;
}

const validateDate = (currentTime, indexDay, form, patForms) => {
  const arrDays = JSON.parse(form.days);
  const check = arrDays[indexDay].check;
  let create = false;
  if (check) {
    const patForm = patForms.find(patF => parseInt(patF.creation_date) >= currentTime);
    if (patForm === undefined) {
      create = true;
    }
  }
  return create;
}

// filtrar los multiples, del dia actual, que no esten creados en los de paciente
const validateSeveralTimes = (severalTimes, patientForms) => {
  const d = new Date();
  const indexDay = d.getDay();
  const currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const currentTime = currentDate.getTime();
  severalTimes.forEach(form => {
    const patForms = patientForms.filter(patF => parseInt(patF.id_custf) === form.id_custf);
    const create = validateDate(currentTime, indexDay, form, patForms);
    form['create'] = create;
  });
  const valForms = severalTimes.filter(form => form.create === true);
  return valForms;
}

const validateFormCreation = async (respCustForms, patientForms) => {
  const oneTime = respCustForms.filter(form => form.one_time === 'true');
  let formsCreate = await validateOneTime(oneTime, patientForms);
  const severalTimes = respCustForms.filter(form => form.one_time === 'false');
  const dateForms = validateSeveralTimes(severalTimes, patientForms);
  dateForms.forEach(form => {
    formsCreate.push(form);
  });
  return formsCreate;
}

const createCurrentForms = async (data, currtPatForms) => {
  let formsCreate = [];
  currtPatForms.forEach(form => {
    const newForm = {
      name: form.name,
      description: form.description,
      structure: JSON.stringify(form.structure),
      idCustomer: data.idCustomer,
      idRespondents: data.idUser,
      idCustf: form.id_custf,
      diagnosis: '',
      presumption: '',
      operation: '',
      dateReplication: '2021-01-01',
      diagnosticDetail: '{}',
      idSpecialist: data.idSpecialist,
      totalWeightPatient: 0,
      totalWeightDiagnosis: 0,
      hashPatient: '',
      hashDiagnosis: '',
      resultPatient: '',
      resultDiagnosis: '',
      idEstablishment: data.idEstablishment,
      status: 'O'// onhold
    };
    formsCreate.push(newForm);
  });
  const dataReq = {
    request: "rgt-form-data",
    data: formsCreate
  };
  const respQry = await sedrequest(dataReq);
  const currtCustForms = respQry.find(qry => qry.ouput === dataReq.request);
  return currtCustForms.answer;
}

fromsCtr.patientForms = async (req, res) => {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  let dataReq = req.body;
  let data = dataReq.data;
  let status = 400;
  let correct = false;
  let answer;

  data['dateInit'] = currentTime;
  data['dateEnd'] = currentTime;

  // Consulta formularios vigentes del cliente
  const currtCustForms = await currentCustomerForms(data);
  const correctCustForms = currtCustForms.correct;
  const respCustForms = currtCustForms.resp;

  // Consultar todos los fomrularios del paciente
  let patientForms = await getPatientForms(data.idUser);
  let correctPatForms = patientForms.correct;
  let respPatForms = patientForms.resp; 
  let answered = [];
  let notAnswered = [];

  if (correctCustForms) {

    if (respCustForms.length > 0) {

      if (correctPatForms) {
        
        // Validar creación
        const valFormsCreate = await validateFormCreation(respCustForms, respPatForms);

        // Crear nuevos formularios del paciente
        await createCurrentForms(data, valFormsCreate);

        // Consultar nuevamente los formularios del paciente
        patientForms = await getPatientForms(data.idUser);
        correctPatForms = patientForms.correct;
        respPatForms = patientForms.resp; 

        status = 200;
        correct = true; 

      } else {
        answer = 'Error al consultar formularios del paciente';
      }
   
    } else {
      // Cliente no tiene formularios vigentes.
      status = 200;
      correct = true;
    }

  } else {
    answer = 'Error al consultar formularios vigentes de cliente';
  }

  if (status === 200) {
    answered = respPatForms.filter(form => form.status === 'R');
    notAnswered = respPatForms.filter(form => form.status !== 'R');
    answer = {
      answered,
      notAnswered
    };
  }
  res.status(status).json({
    correct,
    answer
  });

};

module.exports = fromsCtr;