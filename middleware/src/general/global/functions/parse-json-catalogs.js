const jsonCatalogParse ={};
var collector = [];

// Recorre JSON de Catalogos general.
const childJson = async (data, strTraceId, name, principal, paramName, resultsProcessor) => {
  const traceIdStr = strTraceId.split(',');
  const traceId = traceIdStr.map(parseInter);
  const id = traceId[0];
  const record = data[id];
  var dta = [];
  traceId.splice(0, 1);
  if (paramName === '') {
    paramName = 'name';
  }
  if (traceId.length > 0) {
    const strId = traceId.toString();
    await childJson(record.children, strId, name, principal, paramName, resultsProcessor);
  } else {
    const id = `${record.father},${record.id}`;
    const value = record.value;
    collector = {id, value};
    //collector =  value;
  }
  return collector;
}

const parseInter = (str) => {
  return parseInt(str);
}

jsonCatalogParse.switchJsonParse = async (data, traceId, name, principal, paramName, resultsProcessor) => {
  const retorno = await childJson([data], traceId, name, principal, paramName, resultsProcessor)
  return retorno;
}

module.exports = jsonCatalogParse;