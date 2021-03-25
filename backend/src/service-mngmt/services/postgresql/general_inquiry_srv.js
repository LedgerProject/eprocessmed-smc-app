/*
  1.- El formato en que deben llegar los datos al "generalInquirySrv" en el "req.body" es, Ej:

    req.body = {
      process: 'process name',
      request: 'request name',
      data: [
        {
          params: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object]
          ],
          where: {}
        }
      ]
    }
*/

const { pool } = require('../../../general/config/postgresql_connect');
const { configDB } = require('../../../general/global/data/global_data');
const { saveLogs } = require('../../../general/global/functions/global_functions');
const tablesSet = require('../../../general/global/data/tables_set');
const requestsSet = require('../../../general/global/data/requests_set');
const generalInquirySrv = {};

//  
const timestamp = () => {
  const date = new Date();
  const dateTime = date.getTime();
  return dateTime;
}

//  
const determinesIndexParam = (where, longWhere, numParams) => {// en desuso
  // "index": 
  // "numLoop": Number of records of the query.
  // Is the maximum number of items in the "where" if "longWhere" is greater than 0. Otherwise it is the number of "params".
  let indexParam = {
    index: '',
    numLoop: 0
  };

  if (longWhere > 0) {
    for (const key in where) {
      let lengthItem = where[key].length;
      if (lengthItem > indexParam['numLoop']) {
        indexParam['index'] = key;
        indexParam['numLoop'] = lengthItem;
      }
    }
  } else {
    indexParam['index'] = 'params';
    indexParam['numLoop'] = numParams;
  }
  return indexParam;
}

const addParamsRegisters = (params) => {
  let formattedParams = [];
  for (const param in params) {
    formattedParams.push({param, value: params[param]});
  }
  return formattedParams;
}

const deleteIndex = (where, index) => {
  let whereIndex = where;
  delete whereIndex[index];
  return whereIndex;
}

const addWhereRegisters = (whereIndex, whereRemaining, indexParam, i) => {
  const index = indexParam.index;
  const numLoop = indexParam.numLoop;
  let formattedWhere = [];
  let item;

  if (numLoop > 1) {
    item = whereIndex[i];
  } else {
    item = whereIndex[0];
  }
  formattedWhere.push({param: index, value: item, operator: '='});
  for (const key in whereRemaining) {
    if (whereRemaining[key].length > 1) {
      item = whereRemaining[key][i];
    } else {
      item = whereRemaining[key][0];
    }
    formattedWhere.push({param: key, value: item, operator: '='});
  }
  return formattedWhere;
}

const prepareData = (bodyReq) => {
  let qryData = bodyReq;
  if (qryData.data !== undefined) {
    const params = qryData.data[0].params;
    const numParams = params.length;
    let formattedParams = [];
    let formattedWhere = [];
    let registers = [];
    let param;
    for (let i = 0; i < numParams; i++) {
      // Add the formatted parameters to the registers.
      param = params[i];
      formattedParams = addParamsRegisters(param, numParams);
      const register = { params: formattedParams };
      registers.push(register);
    }
    qryData.data =  registers;
  }
  return qryData;
}

//  
const setBuilder = async (request, tablesSet, requestsSet) => {
  const options = await requestsSet.find(set => set.request === request);
  const table = await tablesSet.find(table => table.table === options.table);
  const set = {
    options,
    table
  }
  return set;
}

const whereBuilder = (arrWhere, params, columns, operator) => {
  let where = '';
  let value;
  arrWhere.forEach(item => {
    const col = columns.find(column => column.param === item.param);
    if (col !== undefined) {
      if (item.type === 'static') {
        value = item.value;
      } else {
        const param = params.find(param => param.param === item.param);
        if (param !== undefined) {
          value = param.value;
        }
      }
      if (col.type === 'str') {
        value = `'${value}'`;  
      }
      const whr = `${col.name} ${item.operator} ${value}`;
      if (where === '') {
        where = `${whr}`;
      } else {
        where = `${where} ${operator} ${whr}`;
      } 
    }
  });
  return where;
}

const returningBuilder = (data) => {
  let returning = '';
  data.forEach((element, i) => {
    switch (i) {
      case 0:
          returning = `RETURNING ${element}`;
        break;
      default:
          returning = `${returning}, ${element}`;
        break;
    }
  });
  return returning;
}

const listBuilder = (data) => {
  const table = data.table;
  const columns = data.columns;
  const ouput = data.ouput;
  const rest = data.rest;
  const conditions = data.conditions;
  const reqData = data.reqData;
  let arrQry = [];
  let strParams = '';
  let params = columns;
  let where = '';
  // Selecciona solo los parametros permitidos de salida. De haber.
  if (ouput.length) {
    params = columns.filter(column => ouput.includes(column.name));
  }
  // Filtra los parametros no permitidos de salida. De haber.
  if (rest.length) {
    params = params.filter(param => !rest.includes(param.name));
  }
  // 
  params.forEach(elemant => {
    if (strParams === '') {
      strParams = `${elemant.name}`;
    } else {
      strParams = `${strParams}, ${elemant.name}`;
    }
  });

  if (conditions.type === 'parametric') {
    const arrWhere = conditions.params;
    const operator = conditions.operator;
    formattedWhere  = whereBuilder(arrWhere, reqData.data[0].params, columns, operator);
    where = `WHERE ${formattedWhere}`;
  }
  arrQry.push(`SELECT ${strParams} FROM ${table} ${where}`);
  return arrQry;
}

const createBuilder = (data) => {
  const table = data.table;
  const columns = data.columns;
  const rest = data.rest;
  const dataReturning = data.returning;
  const reqData = data.reqData.data;
  let arrQry = [];
  const timestampDate = timestamp();
  reqData.forEach(dta => {
    const params = dta.params;
    params.push({param: 'creationDate', value: timestampDate});
    params.push({param: 'modificationDate', value: timestampDate});
    params.push({param: 'idUserCreate', value: 0});
    params.push({param: 'idUserModify', value: 0});
    params.push({param: 'status', value: '0'});
    const numItems = params.length;
    const numRet = dataReturning.length;
    let strColumns = '';
    let strValues = '';
    let strReturning = '';
    let value;
    for (let i = 0; i < numItems; i++) {
      let restricted = false;
      if (rest.length > 0) {
        const item = rest.find(r => r === params[i].param);
        if (item !== undefined) {
          restricted = true;
        }
      }
      if (!restricted) {
        const col = columns.find(column => column.param === params[i].param);
        value = params[i].value;
        // Coloca entre comilla en valor si "type = str".
        if (col.type === 'str') {
          value = `'${value}'`;
        }
        if (i < numItems - 1) {
          strColumns += `${col.name}, `;
          strValues += `${value}, `;
        } else {
          strColumns += col.name;
          strValues += value;
        }
      }
    }
    // Returning
    if (numRet > 0) {
      strReturning = returningBuilder(dataReturning);
    }
    const strQry = `INSERT INTO ${table} (${strColumns}) VALUES (${strValues}) ${strReturning}`;
    arrQry.push(strQry);
  });
  return arrQry;
}

// Reconstruir para arry de registros con array de reqParams
const updateBuilder = (data) => {
  const table = data.table;
  const columns = data.columns;
  const reqData = data.reqData.data;
  const dataWhere = data.conditions.params;
  const operator = data.conditions.operator;
  let arrQry = [];
  reqData.forEach(dta => {
    const params = dta.params;
    const numItems = params.length;
    let strParams = '';
    let value;
    for (let i = 0; i < numItems; i++) {
      const col = columns.find(column => column.param === params[i].param);
      if (col.type === 'str') {
        value = `'${params[i].value}'`;  
      } else {
        value = `${params[i].value}`;  
      }
      if (i < numItems - 1) {
        strParams += `${col.name} = ${value}, `;
      } else {
        strParams += `${col.name} = ${value}`;
      }
    }
    const where = whereBuilder(dataWhere, params, columns, operator);
    const strQry = `UPDATE ${table} SET ${strParams} WHERE ${where}`;
    arrQry.push(strQry);
  });
  return arrQry;
}

const deleteBuilder = (data) => {
  const table = data.table;
  const columns = data.columns;
  const reqData = data.reqData.data;
  const operator = data.conditions.operator;
  let arrQry = [];
  reqData.forEach(dta => {
    const where = whereBuilder(dta.where, columns, operator);
    arrQry.push(`DELETE FROM ${table} WHERE ${where}`);
  });
  return arrQry;
}

const queryBuilder = async (bodyReq, tablesSet, requestsSet) => {
  const set = await setBuilder(bodyReq.request, tablesSet, requestsSet);
  const setType = set.options.type;
  const action = set.options.action;
  const table = set.options.table;
  const ouput = set.options.ouput;
  const rest = set.options.rest;
  const columns = set.table.columns;
  const returning = set.options.returning;
  const conditions = set.options.conditions;
  let params = set.options.params;
  let reqData = bodyReq;
  let data = {
    action,
    table,
    params,
    ouput,
    rest,
    columns,
    conditions,
    returning,
    reqData
  };
  let arrQry = [];
  let qry = '';

  // Valida si la consulta es parametrica o statica.
  if (setType === 'parametric') {
    data['reqData'] = await prepareData(bodyReq);
    switch (action) {
      case 'list':
          arrQry = listBuilder(data);
        break;
      case 'create':
          arrQry = createBuilder(data);
        break;
      case 'update':
          arrQry = updateBuilder(data);
        break;
      case 'delete':
          arrQry = deleteBuilder(data);
        break;    
    }
    // Concatena las consultas.
    arrQry.forEach(element => {
      if (qry === '') {
        qry = `${element};`;
      } else {
        qry = `${qry} ${element};`;
      }
    });
  } else {
    // switch (key) {
    //   case value:
    //       qyr = ;
    //     break;
    // }
  }
  return qry;
}

/*  */
generalInquirySrv.query = async (req, res) => {
  const bodyReq = req.body;
  const qry = await queryBuilder(bodyReq, tablesSet, requestsSet);

  console.log('generalInquirySrv.query qry');
  console.log(qry);
  
  try {
    poolConnect = pool(configDB);
    const answer = await poolConnect.query(qry);

    console.log('answer');
    console.log(answer);

    res.status(200).json({
      correct: true,
      resp: answer.rows
    });

  } catch (err) {

    console.log('err');
    console.log(err);

    const created_on = new Date();
    const log = { module: 'generalInquirySrv', process: 'query', line: '205', data: {bodyReq, qry}, err, created_on };
    saveLogs(log);

    res.status(400).json({
      correct: false,
      resp: err
    });
    
  }

}

module.exports = generalInquirySrv;

/*
  Si las consultas son estaticas:
  Llegan los datos y del set se extrae el query en queryBuilder, o
  Un swith debe direccionarse a la funcioin que lo arme.
*/