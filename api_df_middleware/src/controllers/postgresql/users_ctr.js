const request = require("request");
const { urlSrv, urls, rootOtp }  = require('../../global/global_data');
const usersCtr = {};

const urlView = urlSrv+urls.usrSrv;
const urlServerOtp = rootOtp+urls.scriptOtpSrv;
const urlCrtUser = urlSrv+urls.crtUsrSrv;
const urlUpdUsr = urlSrv+urls.updUsrSrv;
const urlQyr = urlSrv+urls.qyrUsrSrv;
const urlAuth = urlSrv+urls.authUsrSrv;
const urlLogauth = urlSrv+urls.lgutUsrSrv;
const urlDtaFrmSrv = urlSrv+urls.crtDtaFrmSrv;

usersCtr.list = (req, res) => {
  request({
    url: urlView,
    json: true,
    method: 'GET'
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body)
        res.send(body);
      }
    })
};

usersCtr.query = (req, res) => {

  const { provider, google_id, phone } = req.body;
  let data = {};

  switch (provider) {
    case 'google':
        data = {
          type: 'params', 
          item: 'google_id', 
          value: google_id
        };
      break;
    case 'otp':
        data = {
          type: 'params', 
          item: 'phone', 
          value: phone
        };
      break;      
  }
  
  request({
    url: urlQyr,
    json: true,
    method: 'POST',
    body: data
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

usersCtr.create = (req, res) => {
  request({
    url: urlCrtUser,
    json: true,
    method: 'POST',
    body: req.body
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

usersCtr.upDate = (req, res) => {
  const url = `${urlSrv}${urls.updUsrSrv}`;

  console.log('req.body');
  console.log(req.body);

  request({
  url: url,
  json: true,
  method: 'PUT',
  body: req.body
  },  (error, response, body) => {
    console.log(body);
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

usersCtr.sendOtp = (req, res) => {
  let params = req.body;
  const name = params.name;
  const number = `${params.code_int_phone}${params.phone}`;
  const code = Math.floor(Math.random()*(10000-1000))+1000;
  const paramsOtpSend = {
    name,
    number,
    code,
    type: 'code'
  };

  // Consulta si exite el número de teléfono
  const paramsOtpUsr = {
    type: 'params',
    item: 'phone',
    value: number
  }
  request({
      url: urlQyr,
      json: true,
      method: 'POST',
      body: paramsOtpUsr
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (body.correct && body.resp.length > 0) {
          // Si existe: Guardar "code" en db.
          const paramsUpDate = {
            type: 'code',
            id: body.resp[0].usr_id,
            dataset: {
              code
            }
          }

          request({
            url: urlUpdUsr,
            json: true,
            method: 'PUT',
            body: paramsUpDate
          }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              // Enviar code Otp
              request({
                url: urlServerOtp,
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                method: 'POST',
                form: paramsOtpSend
              }, (error, response, body) => {
                res.send(body);
              })  
            }
          })

        } else {
          //Si no existe el teléfono, crea el usuario.
          const paramsCreate = {
            doc_id: null,
            google_id: null,
            phone: number,
            code: code,
            name: name,
            password: null,
            email: null,
            role: 'respondent',
            provider: 'otp'
          }
          request({
            url: urlCrtUser,
            json: true,
            method: 'POST',
            body: paramsCreate
          }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              // Crea el formulario al usuario
              // Traer de DB
              const nameForm = 'FORMULARIO COVID-19';
              const description = 'A continuación vamos a recoger información que va a ser valorada por personal sanitario cualificado por lo que solicitamos se tome su tiempo en responder adecuadamente cada pregunta y con la mayor veracidad que el caso lo amerita. Marque en cada casilla en caso de ser afirmativa o cumpliméntala en caso de tener una casilla para rellenar.'
              const customer_id = 13;
              // const strStruc = [{"name": "Datos identificativos", "role": 3, "pages": [[{"id": "", "name": "Sexo:", "type": "Radio", "class": "", "items": ["Hombre", "Mujer"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Edad:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "DNI:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Comunidad:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Código Postal", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Contacto móvil:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": ["disabled"], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Correo electrónico", "type": "Email", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Antecedentes Médicos", "role": 3, "pages": [[{"id": "", "name": "Tipo de sangre", "type": "Radio", "class": "", "items": ["A", "B", "AB", "O"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Enfermedades existentes o anteriores:", "type": "Checkbox", "class": "", "items": ["Hipertensión", "Colesterol elevado", "Obesidad", "Diabetes mellitus", "Otra"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otra enfermedad:", "type": "Text", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Aquí detalle la enfermedad que no este en el listado anterior."}, {"id": "", "name": "Medicación:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Escriba aquí sus tratamientos de tener alguno actualmente."}]], "description": ""}, {"name": "Tabla de Síntomas", "role": 3, "pages": [[{"id": "", "name": "Síntomas durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Fiebre", "Tos seca", "Tos con flema", "Dolor al tragar alimentos", "Sensación de falta de aire ", "Escalofríos", "Mocos verdosos", "Mocos blanquecinos", "Dolor de garganta", "Dolor de cabeza", "Dolor muscular", "Pérdida parcial o total de gusto", "Pérdida total o parcial del olfato", "Cansancio", "Dificultad para respirar", "Diarrea", "Dolor abdominal", "Mareo", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otros síntomas:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Indique otros síntomas que no estén en la lista (Max. 150 caracteres)."}, {"id": "", "name": "Fecha de inicio de los síntomas:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}, {"name": "Comportamiento Epidemiológico", "role": 3, "pages": [[{"id": "", "name": "¿Hace teletrabajo?:", "type": "Radio", "class": "", "items": ["Total", "Parcial", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Actividad Laboral durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["En contacto con personal sanitario", "En contacto con Cuerpos y Fuerzas de Seguridad (bomberos, policías, militares etc)", "Trabajos cara al publico directo (Comercio, hostelería, servicios)", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otro tipo de actividad laboral durante los últimos 15 días:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Tipos de desplazamientos fuera de casa ha realizado diariamente durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["He acudido al hospital o similar", "He acudido recientemente a una zona o región con elevado número de contagios o que la han confinado"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Desplazamiento fuera del lugar de residencia, mayor a una hora durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["Tren", "Avión", "Autobús"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Desplazamiento fuera del lugar de residencia, menor a una hora durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["Tren", "Avión", "Autobús"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}], [{"id": "", "name": "Tipo de proveedor de servicios/productos de 1º necesidad que utilizo durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Supermercado", "Tienda local", "Farmacia local", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Otro tipo de proveedor de servicios/productos:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Vive con familiares que han sido diagnosticados de COVID durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto con personas diagnosticadas de COVID durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto sin medidas de protección con personas diagnosticadas, por más de 15 minutos y a menos de dos metros de distancia?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha asistido a eventos cerradoscon más de 10 personas durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Signos vitales", "role": 4, "pages": [[{"id": "", "name": "¿Se ha tomado la temperatura?", "type": "Radio", "class": "", "items": ["No me tomado la temperatura", "Menos de 37,5", "Entre 37,5 a 38", "Más de 38"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Frecuencia respiratoria", "type": "Radio", "class": "", "items": ["Estoy respirando más que otros días (más de 20 veces por minuto)", "Estoy respirando igual que otros días"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": "Examen físico (SIGNOS VITALES):"}, {"name": "Tabla de resultados de laboratorio", "role": 4, "pages": [[{"id": "", "name": "¿Le han hecho alguna prueba de diagnóstico para COVID-19?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Si su respuesta anterior fue positiva por favor adjunte el examen y responda la siguiente pregunta:", "type": "File", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Este resultado es?", "type": "Radio", "class": "", "items": ["Positivo", "Negativo"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Su tratamiento fue hospitalario o domiciliario?", "type": "Checkbox", "class": "", "items": ["Tratamiento Hospitalario", "Tratamiento en domicilio", "Ningún tratamiento farmacológico", "Cuarentena en domicilio"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Fecha de cuando se hizo el test:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Si estuvo en cuarentena, por favor indique cuantos días:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}]
              const strStruc = [{"name": "Datos identificativos", "role": 3, "pages": [[{"id": "", "name": "Sexo: *", "type": "Radio", "class": "", "items": ["Hombre", "Mujer"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Edad: *", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "DNI: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Comunidad Autónoma: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Código Postal: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Contacto móvil: *", "type": "Number", "class": "", "items": [], "style": "", "optAttr": ["disabled"], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Correo electrónico: *", "type": "Email", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Antecedentes Médicos", "role": 3, "pages": [[{"id": "", "name": "Tipo de sangre", "type": "Radio", "class": "", "items": ["A", "B", "AB", "O","No lo sé"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Enfermedades existentes o anteriores:", "type": "Checkbox", "class": "", "items": ["Ninguna", "Hipertensión", "Colesterol elevado", "Obesidad", "Diabetes mellitus", "Otra"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otra enfermedad:", "type": "Text", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Aquí detalle la enfermedad que no este en el listado anterior."}, {"id": "", "name": "Medicación Habitual:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Escriba aquí sus tratamientos de tener alguno actualmente."}]], "description": ""}, {"name": "Tabla de Síntomas", "role": 3, "pages": [[{"id": "", "name": "Síntomas durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Ninguno", "Fiebre", "Tos seca", "Tos con flema", "Dolor al tragar alimentos", "Sensación de falta de aire ", "Escalofríos", "Mocos verdosos", "Mocos blanquecinos", "Dolor de garganta", "Dolor de cabeza", "Dolor muscular", "Pérdida parcial o total de gusto", "Pérdida total o parcial del olfato", "Cansancio", "Dificultad para respirar", "Diarrea", "Dolor abdominal", "Mareo", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otros síntomas:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Indique otros síntomas que no estén en la lista (Max. 150 caracteres)."}, {"id": "", "name": "Fecha de inicio de los síntomas:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}, {"name": "Comportamiento Epidemiológico", "role": 3, "pages": [[{"id": "", "name": "¿Hace teletrabajo?: *", "type": "Radio", "class": "", "items": ["Total", "Parcial", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Actividad Laboral durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["En contacto con personal sanitario", "En contacto con Cuerpos y Fuerzas de Seguridad (bomberos, policías, militares etc)", "Trabajos cara al publico directo (Comercio, hostelería, servicios)", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otro tipo de actividad laboral durante los últimos 15 días:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipos de desplazamientos fuera de casa ha realizado diariamente durante los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["He acudido a centros sanitarios, hospitales o similares", "He acudido a una zona o región con elevado número de contagios o que la han confinado", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Cuándo sales de casa que tipo de transporte has utilizado más de una hora sin las medidas de distanciamiento en los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["Tren", "Coche o Automóvil", "Autobús", "Tranvía", "Bicicleta", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Cuándo sales de casa que tipo de transporte has utilizado menos de una hora sin las medidas de distanciamiento en los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["Tren", "Coche o Automóvil", "Autobús", "Tranvía", "Bicicleta", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}], [{"id": "", "name": "Tipo de proveedor de servicios/productos de primera necesidad que utilizo durante los últimos 15 días *", "type": "Checkbox", "class": "", "items": ["Supermercado", "Tienda local", "Farmacia local", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Otro tipo de proveedor de servicios/productos:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Vive con familiares que han sido diagnosticados de COVID durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto con personas diagnosticadas de COVID durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto sin medidas de protección con personas diagnosticadas, por más de 15 minutos y a menos de dos metros de distancia? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha asistido a eventos cerradoscon más de 10 personas durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Signos vitales", "role": 4, "pages": [[{"id": "", "name": "¿Se ha tomado la temperatura? *", "type": "Radio", "class": "", "items": ["No me tomado la temperatura", "Menos de 37,5", "Entre 37,5 a 38", "Más de 38"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Frecuencia respiratoria *", "type": "Radio", "class": "", "items": ["Estoy respirando más que otros días (más de 20 veces por minuto)", "Estoy respirando igual que otros días"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": "Examen físico (SIGNOS VITALES):"}, {"name": "Tabla de resultados de laboratorio", "role": 4, "pages": [[{"id": "", "name": "¿Le han realizado alguna prueba para detectar el covid-19 en los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Si su respuesta anterior fue positiva por favor adjunte el examen y responda las siguientes preguntas: *", "type": "File", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Cuándo se hizo la prueba:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipo de examen le hicieron?", "type": "Radio", "class": "", "items": ["PCR", "Prueba Anticuerpos-Antígenos", "No lo sé"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Su resultado es?", "type": "Radio", "class": "", "items": ["Positivo", "Negativo", "No Concluyente"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipo de tratamiento ha recibido?", "type": "Checkbox", "class": "", "items": ["He sido ingresado en el hospital", "He recibido tratamiento médico en casa", "He recibido asistencia médica telefónica", "He realizado cuarentena en domicilio"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Si estuvo en cuarentena, por favor indique cuantos días:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}]
              const structure = JSON.stringify(strStruc);
              const answered_check = false;
              const respondents_id = body.resp.usr_id;
              const custf_id = 43;

              paramsDtaFrm = {
                name: nameForm,
                description,
                customer_id,
                structure,
                answered_check,
                respondents_id,
                custf_id
              }

              request({
                url: urlDtaFrmSrv,
                json: true,
                method: 'POST',
                body: paramsDtaFrm
              }, (error, response, body) => {
                if (!error && response.statusCode === 200) {//  informa, su código de acceso es: 
                  // Enviar code Otp

                  // https://test.e-processmed.com/clicksend_otp.php
                  // https://test.e-processmed.com/clicksend_otp.php
                  console.log('urlServerOtp');
                  console.log(urlServerOtp);

                  request({
                    url: urlServerOtp,
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    form: paramsOtpSend
                  }, (error, response, body) => {
                    res.send(body);
                  }) 
                }
              })
            }
          })
        }

      }
    })
};

usersCtr.auth = (req, res) => {
  let params = req.body;
  let { password } = params;

  if (password != null) {
    params.password = password.toString();
  }

  switch (req.body.provider) {
    case 'default':
          request({
            url: urlAuth,
            json: true,
            method: 'POST',
            body: req.body
          }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              res.send(body);
            }
          })
      break;
    case 'google':
        const paramsG = {
          type: 'params',
          item: 'google_id',
          value: params.google_id
        }
        request({
          url: urlQyr,
          json: true,
          method: 'POST',
          body: paramsG
        }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            if (body.correct && body.resp.length > 0) {
              request({
                url: urlAuth,
                json: true,
                method: 'POST',
                body: params
              }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                  res.send(body);
                }
              })
            } else {
              request({
                url: urlCrtUser,
                json: true,
                method: 'POST',
                body: params
              }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                  const nameForm = 'FORMULARIO COVID-19';
                  const description = 'A continuación vamos a recoger información que va a ser valorada por personal sanitario cualificado por lo que solicitamos se tome su tiempo en responder adecuadamente cada pregunta y con la mayor veracidad que el caso lo amerita. Marque en cada casilla en caso de ser afirmativa o cumpliméntala en caso de tener una casilla para rellenar.'
                  const customer_id = 13;
                  // const strStruc = [{"name": "Datos identificativos", "role": 3, "pages": [[{"id": "", "name": "Sexo:", "type": "Radio", "class": "", "items": ["Hombre", "Mujer"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Edad:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "DNI:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Comunidad:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Código Postal", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Contacto móvil:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": ["disabled"], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Correo electrónico", "type": "Email", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Antecedentes Médicos", "role": 3, "pages": [[{"id": "", "name": "Tipo de sangre", "type": "Radio", "class": "", "items": ["A", "B", "AB", "O"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Enfermedades existentes o anteriores:", "type": "Checkbox", "class": "", "items": ["Hipertensión", "Colesterol elevado", "Obesidad", "Diabetes mellitus", "Otra"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otra enfermedad:", "type": "Text", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Aquí detalle la enfermedad que no este en el listado anterior."}, {"id": "", "name": "Medicación:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Escriba aquí sus tratamientos de tener alguno actualmente."}]], "description": ""}, {"name": "Tabla de Síntomas", "role": 3, "pages": [[{"id": "", "name": "Síntomas durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Fiebre", "Tos seca", "Tos con flema", "Dolor al tragar alimentos", "Sensación de falta de aire ", "Escalofríos", "Mocos verdosos", "Mocos blanquecinos", "Dolor de garganta", "Dolor de cabeza", "Dolor muscular", "Pérdida parcial o total de gusto", "Pérdida total o parcial del olfato", "Cansancio", "Dificultad para respirar", "Diarrea", "Dolor abdominal", "Mareo", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otros síntomas:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Indique otros síntomas que no estén en la lista (Max. 150 caracteres)."}, {"id": "", "name": "Fecha de inicio de los síntomas:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}, {"name": "Comportamiento Epidemiológico", "role": 3, "pages": [[{"id": "", "name": "¿Hace teletrabajo?:", "type": "Radio", "class": "", "items": ["Total", "Parcial", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Actividad Laboral durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["En contacto con personal sanitario", "En contacto con Cuerpos y Fuerzas de Seguridad (bomberos, policías, militares etc)", "Trabajos cara al publico directo (Comercio, hostelería, servicios)", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otro tipo de actividad laboral durante los últimos 15 días:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Tipos de desplazamientos fuera de casa ha realizado diariamente durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["He acudido al hospital o similar", "He acudido recientemente a una zona o región con elevado número de contagios o que la han confinado"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Desplazamiento fuera del lugar de residencia, mayor a una hora durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["Tren", "Avión", "Autobús"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Desplazamiento fuera del lugar de residencia, menor a una hora durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["Tren", "Avión", "Autobús"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}], [{"id": "", "name": "Tipo de proveedor de servicios/productos de 1º necesidad que utilizo durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Supermercado", "Tienda local", "Farmacia local", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Otro tipo de proveedor de servicios/productos:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Vive con familiares que han sido diagnosticados de COVID durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto con personas diagnosticadas de COVID durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto sin medidas de protección con personas diagnosticadas, por más de 15 minutos y a menos de dos metros de distancia?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha asistido a eventos cerradoscon más de 10 personas durante los últimos 15 días?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Signos vitales", "role": 4, "pages": [[{"id": "", "name": "¿Se ha tomado la temperatura?", "type": "Radio", "class": "", "items": ["No me tomado la temperatura", "Menos de 37,5", "Entre 37,5 a 38", "Más de 38"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Frecuencia respiratoria", "type": "Radio", "class": "", "items": ["Estoy respirando más que otros días (más de 20 veces por minuto)", "Estoy respirando igual que otros días"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": "Examen físico (SIGNOS VITALES):"}, {"name": "Tabla de resultados de laboratorio", "role": 4, "pages": [[{"id": "", "name": "¿Le han hecho alguna prueba de diagnóstico para COVID-19?", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Si su respuesta anterior fue positiva por favor adjunte el examen y responda la siguiente pregunta:", "type": "File", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Este resultado es?", "type": "Radio", "class": "", "items": ["Positivo", "Negativo"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Su tratamiento fue hospitalario o domiciliario?", "type": "Checkbox", "class": "", "items": ["Tratamiento Hospitalario", "Tratamiento en domicilio", "Ningún tratamiento farmacológico", "Cuarentena en domicilio"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Fecha de cuando se hizo el test:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Si estuvo en cuarentena, por favor indique cuantos días:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}];
                   const strStruc = [{"name": "Datos identificativos", "role": 3, "pages": [[{"id": "", "name": "Sexo: *", "type": "Radio", "class": "", "items": ["Hombre", "Mujer"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Edad: *", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "DNI: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Comunidad Autónoma: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Código Postal: *", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Contacto móvil: *", "type": "Number", "class": "", "items": [], "style": "", "optAttr": ["disabled"], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Correo electrónico: *", "type": "Email", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Antecedentes Médicos", "role": 3, "pages": [[{"id": "", "name": "Tipo de sangre", "type": "Radio", "class": "", "items": ["A", "B", "AB", "O","No lo sé"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Enfermedades existentes o anteriores:", "type": "Checkbox", "class": "", "items": ["Ninguna", "Hipertensión", "Colesterol elevado", "Obesidad", "Diabetes mellitus", "Otra"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otra enfermedad:", "type": "Text", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Aquí detalle la enfermedad que no este en el listado anterior."}, {"id": "", "name": "Medicación Habitual:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Escriba aquí sus tratamientos de tener alguno actualmente."}]], "description": ""}, {"name": "Tabla de Síntomas", "role": 3, "pages": [[{"id": "", "name": "Síntomas durante los últimos 15 días", "type": "Checkbox", "class": "", "items": ["Ninguno", "Fiebre", "Tos seca", "Tos con flema", "Dolor al tragar alimentos", "Sensación de falta de aire ", "Escalofríos", "Mocos verdosos", "Mocos blanquecinos", "Dolor de garganta", "Dolor de cabeza", "Dolor muscular", "Pérdida parcial o total de gusto", "Pérdida total o parcial del olfato", "Cansancio", "Dificultad para respirar", "Diarrea", "Dolor abdominal", "Mareo", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otros síntomas:", "type": "Textarea", "class": "", "items": [], "style": "", "extItems": [], "attributes": [""], "description": "Indique otros síntomas que no estén en la lista (Max. 150 caracteres)."}, {"id": "", "name": "Fecha de inicio de los síntomas:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}, {"name": "Comportamiento Epidemiológico", "role": 3, "pages": [[{"id": "", "name": "¿Hace teletrabajo?: *", "type": "Radio", "class": "", "items": ["Total", "Parcial", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Actividad Laboral durante los últimos 15 días:", "type": "Checkbox", "class": "", "items": ["En contacto con personal sanitario", "En contacto con Cuerpos y Fuerzas de Seguridad (bomberos, policías, militares etc)", "Trabajos cara al publico directo (Comercio, hostelería, servicios)", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Otro tipo de actividad laboral durante los últimos 15 días:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipos de desplazamientos fuera de casa ha realizado diariamente durante los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["He acudido a centros sanitarios, hospitales o similares", "He acudido a una zona o región con elevado número de contagios o que la han confinado", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Cuándo sales de casa que tipo de transporte has utilizado más de una hora sin las medidas de distanciamiento en los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["Tren", "Coche o Automóvil", "Autobús", "Tranvía", "Bicicleta", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Cuándo sales de casa que tipo de transporte has utilizado menos de una hora sin las medidas de distanciamiento en los últimos 15 días?", "type": "Checkbox", "class": "", "items": ["Tren", "Coche o Automóvil", "Autobús", "Tranvía", "Bicicleta", "Ninguna"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}], [{"id": "", "name": "Tipo de proveedor de servicios/productos de primera necesidad que utilizo durante los últimos 15 días *", "type": "Checkbox", "class": "", "items": ["Supermercado", "Tienda local", "Farmacia local", "Otro"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Otro tipo de proveedor de servicios/productos:", "type": "Text", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Vive con familiares que han sido diagnosticados de COVID durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto con personas diagnosticadas de COVID durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha tenido contacto sin medidas de protección con personas diagnosticadas, por más de 15 minutos y a menos de dos metros de distancia? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "¿Ha asistido a eventos cerradoscon más de 10 personas durante los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": ""}, {"name": "Signos vitales", "role": 4, "pages": [[{"id": "", "name": "¿Se ha tomado la temperatura? *", "type": "Radio", "class": "", "items": ["No me tomado la temperatura", "Menos de 37,5", "Entre 37,5 a 38", "Más de 38"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Frecuencia respiratoria *", "type": "Radio", "class": "", "items": ["Estoy respirando más que otros días (más de 20 veces por minuto)", "Estoy respirando igual que otros días"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}]], "description": "Examen físico (SIGNOS VITALES):"}, {"name": "Tabla de resultados de laboratorio", "role": 4, "pages": [[{"id": "", "name": "¿Le han realizado alguna prueba para detectar el covid-19 en los últimos 15 días? *", "type": "Radio", "class": "", "items": ["Si", "No"], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Si su respuesta anterior fue positiva por favor adjunte el examen y responda las siguientes preguntas: *", "type": "File", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": ["required"], "description": ""}, {"id": "", "name": "Cuándo se hizo la prueba:", "type": "Datepicker", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipo de examen le hicieron?", "type": "Radio", "class": "", "items": ["PCR", "Prueba Anticuerpos-Antígenos", "No lo sé"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Su resultado es?", "type": "Radio", "class": "", "items": ["Positivo", "Negativo", "No Concluyente"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "¿Qué tipo de tratamiento ha recibido?", "type": "Checkbox", "class": "", "items": ["He sido ingresado en el hospital", "He recibido tratamiento médico en casa", "He recibido asistencia médica telefónica", "He realizado cuarentena en domicilio"], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}, {"id": "", "name": "Si estuvo en cuarentena, por favor indique cuantos días:", "type": "Number", "class": "", "items": [], "style": "", "optAttr": [], "extItems": [], "attributes": [""], "description": ""}]], "description": ""}]
                  const structure = JSON.stringify(strStruc);
                  const answered_check = false;
                  const respondents_id = body.resp.usr_id;
                  const custf_id = 43;

                  paramsDtaFrm = {
                    name: nameForm,
                    description,
                    customer_id,
                    structure,
                    answered_check,
                    respondents_id,
                    custf_id
                  }

                  request({
                    url: urlDtaFrmSrv,
                    json: true,
                    method: 'POST',
                    body: paramsDtaFrm
                  }, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                      request({
                        url: urlAuth,
                        json: true,
                        method: 'POST',
                        body: params
                      }, (error, response, body) => {
                        if (!error && response.statusCode === 200) {
                          res.send(body);
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      break;
    case 'otp':
        request({
          url: urlAuth,
          json: true,
          method: 'POST',
          body: params
        }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            res.send(body);
          }
        })
      break;      
  }
};

usersCtr.logout = (req, res) => {
  let { tk } = req.body;
  let url = urlLogauth+tk;

  console.log(url);

  request({
    url: url,
    json: true,
    method: 'POST'
    }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.send(body);
    }
  })
};

module.exports = usersCtr;