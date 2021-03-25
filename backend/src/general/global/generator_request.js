/*  
    Función de peticiones http general:
    requests:     Arreglo con set de peticiones posibles, por si se requiere seleccionar en alguna parte del flujo.
    reqSelect:    Arreglo con set de peticiones seleccionadas.
    collector:    Almacena las respuestas de cada petición.
    prepareData:  Función para preparar los datos si se requiere alguno de peticiones anteriores.
    process:      Proceso a realizar posterior a la consulta.
    input:        Nombre del parámetro de donde se sacaran los datos faltantes. almacenados en peticiones anteriores.
    ouput:        Nombre del parámetro donde se almacenaran la respuesta de la petición.
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
  let {coll, ouput, resp} = data;

  const itme = coll.find(item => {
    if (item.ouput === ouput) {
      item = { ouput: ouput, answer: resp };
      return item;
    }
  });
  if (itme === undefined) {
    coll.push({ ouput: ouput, answer: resp });
  }
  return coll;
}

const generatorRequest = async (reqSelect, requests, collector) => {

  const dispatcher = (reqSlc, reqs, coll) => {
    return new Promise( async (resolve, reject) => {
      const set = reqSlc[0];

      // console.log('generatorRequest dispatcher set');
      // console.log(set);

      const { prepareData, process, input, ouput, url, method, data, headers, bodyType, respFormat } = set;
      let dta;
      let params;
      let body;
      let form;

      // Si se requieren datos de peticiones anteriores, la funcion 'prepareData' es requerida para construirlos con los almacenados en el 'collector'.
      if (prepareData != '') {
        dta = await prepareData(coll, input);
      } else {
        dta = data;
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

      // console.log('dispatcher options');
      // console.log(options);

      // Realiza la consulta y envia la respuesta al 'process'.
      await fetch(url, options)
        .then(resp => validateResp(resp, respFormat))
        .then(resp => {
          let answer;
          if (process !== '') {
            answer = process(coll, ouput, resp)// return {coll, ouput, data}
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

  // console.log('generatorRequest reqSelect');
  // console.log(reqSelect);

  const resp = await dispatcher(reqSelect, requests, collector)
    .then((answer) => { return answer })
    .catch((err) => console.error(`Error en Cascada "dispatcher: ${err}`));

  // console.log('resp ::::::::::::: ');
  // console.log(resp);


  return resp;
  
}

module.exports = generatorRequest;