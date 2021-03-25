/*  
  Función de peticiones http general:
  ===================================

  Ejemplo de petición:
  --------------------
  const generatorRequest = require('<Path>');
  var collector = [];

  const data<request-name>1 = strgf({ process: '', request: "<request-name>1", data: [ { ... } ] } );
  const set<request-name>1 = { prepareData: '', process: '', input: '', ouput: '<request-name>1', url: '', method: '', data: data<request-name>1, headers: '', bodyType: '', respFormat: '' };
  ...
  const data<request-name>n = strgf({ process: '', request: "<request-name>n", data: [ { ... } ] } );
  const set<request-name>n = { prepareData: '', process: '', input: '', ouput: '<request-name>n', url: '', method: '', data: data<request-name>n, headers: '', bodyType: '', respFormat: '' };
  
  const reqSelet = [set<request-name>1, ... data<request-name>n];
  const requests = [set<request-name>1, ... data<request-name>n];

  generatorRequest(reqSelet, requests, collector)
    .then()
    .catch();


  Descripción:
  ------------

  data<request-name>: { Objeto con datos de la petición.
    process:            Nombre del proyecto al que pertenece, si es del sistema su valor es "system". Con este se optinen los parámetros de conexión a la Base de Datos.
    request:            Nombre de la petición.
    conditions:         Condigión general en caso de todos los registros compartirla. Ej: { params: [{param: 'key', value: key, operator: '='}] }   
    data: {             Arreglo de objetos con datos para armar la consulta. Ej: [{params: [{param: '', value: ''}, ... {param: '', value: ''}], where: [{param: '', value: '', operator: '='}, ... {param: '', value: '', operator: '='}]}]. Si no esta en este formato hay que formatearla en la función del "prepareData" si es un flujo o antes de incorporar a la petición.
      params:           Arreglo de objetos con parametros para armar la consulta.
      where:            Condición particular del registro.
    }
  }

  strgf:                Función que retorna el objeto como cadena con formato JSON (JSON.stringify).
  
  set<request-name>: {  Objeto con cabeceras y datos de la petición.
    prepareData:        Función para preparar los datos si se requiere alguno de peticiones anteriores o dar el formato que recibe "generalInquirySrv".
    process:            Proceso a realizar posterior a la consulta.
    input:              Parámeto del "colector" de donde se toman datos de otra petición anterior necesarios en la actual.
    ouput:              Parámeto del "colector" donde se almacenara la salida de la petición, regularmente su valor es "<request-name>".
    url:                Dirección del servicio.
    method:             POST | GET | PUT | DELETE.
    data:               data<request-name>.
    headers:            Cabeceras.
    bodyType:           Formato de envio de los datos de la petición.
    respFormat:         Formato de retorno de la petición.
  }

  reqSelet:             Arreglo con la secuencia de peticiones seleccionadas (iniciales). Puede agruparse otra secuencia producto del resultado de alguna petición inicial.
  requests:             Arreglo con todas las posibles peticiones. Opcional si se agrupa otra secuencia producto del resultado de alguna petición en alguna parte del flujo.

*/

const fetch = require('node-fetch');

const validateRequestQueue = async (data, dispatcher) => {
  let {reqSlc, reqs, coll} = data;
  if (reqSlc.length > 0) {
    await dispatcher(reqSlc, reqs, coll);
  }
  return coll;
}

const validateResp = (res, respFormat) => {
  let resp;
  switch (respFormat) {
    case 'Text':
        resp = res.text();
      break;
    case 'Json':
        resp = res.json();
      break;     
  }
  return resp;
}

// Agregar la respuesta al 'collector'
const returnRequests = (data) => {
  let { coll, ouput, resp } = data;
  if (coll !== undefined) {
      const itme = coll.find(param => {
        if (param.ouput === ouput) {
          param = { ouput: ouput, answer: resp };
          return param;
        }
      });
      if (itme === undefined) {
        coll.push({ ouput: ouput, answer: resp });
      }
      return coll;  
  }
}

const generatorRequest = async (reqSelect, requests, collector) => {

  const dispatcher = (reqSlc, reqs, coll) => {
    return new Promise( async (resolve, reject) => {
      const set = reqSlc[0];
      const { prepareData, process, input, ouput, url, method, data, headers, bodyType, respFormat } = set;
      let dta = data;
      let params;
      let body;
      let form;

      if (prepareData != '') {
        dta = await prepareData(coll, input, dta);
      }

      switch (bodyType) {
        case 'body':
            body = dta;
          break;
        case 'form':
            form = dta;
          break;            
        default:
            params = dta;
          break;
      }

      const options = { method, params, body, form, headers };

      // Realiza la consulta y envia la respuesta al 'process'.
      await fetch(url, options)
        .then(resp => validateResp(resp, respFormat))
        .then(async resp => {
          let answer;
          if (process !== '') {
            answer = await process(reqs, coll, ouput, resp);
          } else {
            answer = {coll, ouput, resp};
          }
          return answer;
        })
        .then(resp => returnRequests(resp))
        .then(async answer => {
          reqSlc.splice(0, 1);
          let data = {reqSlc, reqs, coll};
          coll = await validateRequestQueue(data, dispatcher)
          resolve(coll);
        })
        .catch(err => console.error(err));
    });
  };

  const resp = await dispatcher(reqSelect, requests, collector)
    .then((answer) => { return answer })
    .catch((err) => console.error(`Error en Cascada "dispatcher: ${err}`));

  return resp;
}

module.exports = generatorRequest;