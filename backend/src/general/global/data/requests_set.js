/*  
  action: 
  rest: 
  ouput: Nombre del parámetro donde se almacenaran la respuesta de la petición.
  params: Filtro de las columnas contra "ouput" y/o "rest". Quedan almacenados solos los permitidos como salida.
  type: parametric | static.
    1.- En el caso del "request": Si es "parametric" el "query" se arma con los "params", si no, debe estar almacenado en "query".
    2.- En el caso de la "conditions": Si es "parametric" el "query" se arma con los "conditions.params", si no, debe estar almacenado en "conditions.static".
*/

const requestsSet = [
    {
      request: 'catalogs', action: 'list', table: 'catalogs', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'catl-by-id', action: 'list', table: 'catalogs', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idCatalog', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },    
    {
      request: 'rgt-catalogs', action: 'create', table: 'catalogs', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'upd-catalogs', action: 'update', table: 'catalogs', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idCatalog', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'dlt-catalogs', action: 'delete', table: 'catalogs', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric'
    },
    {
      request: 'users', action: 'list', table: 'users', ouput: [], rest: ['password'],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'get-login', action: 'list', table: 'users', ouput: ['id_user','dni','name','lastname','mail','phone'], rest: [],
      params: [],
      conditions: {
        type: 'parametric', 
        params: [{param: 'login', value: '', operator: '=', type: 'parametric'}, {param: 'password', value: '', operator: '=', type: 'parametric'}], 
        operator: 'AND', static: '' 
      },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'parameters', action: 'list', table: 'parameters', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'customers', action: 'list', table: 'customer', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'establishment', action: 'list', table: 'establishment', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'estab-by-id', action: 'list', table: 'establishment', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },   
    {
      request: 'rgt-establishment', action: 'create', table: 'establishment', ouput: [], rest: ['idEstablishment'],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: ['id_establishment'],
      type: 'parametric',
      query: ''
    },
    {
      request: 'upd-establishment', action: 'update', table: 'establishment', ouput: [], rest: ['idEstablishment', 'dni'],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'patients', action: 'list', table: 'patients', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: ''  },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'pat-by-id', action: 'list', table: 'patients', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idPatient', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },    
    {
      request: 'rgt-patients', action: 'create', table: 'patients', ouput: [], rest: ['idPatient'],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: ['id_patient'],
      type: 'parametric',
      query: ''
    },
    {
      request: 'upd-patients', action: 'update', table: 'patients', ouput: [], rest: ['idPatient', 'dni'],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idPatient', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'dlt-patients', action: 'delete', table: 'patients', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric'
    },
    {
      request: 'structure-process', action: 'list', table: 'structure_process', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'struc-by-id', action: 'list', table: 'structure_process', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idCatProcess_P', value: '', operator: '=', type: 'parametric'},
      {param: 'idCatProcess_S', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'process-by-id', action: 'list', table: 'structure_process', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idCatProcess', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },   
    {
      request: 'rgt-structure-process', action: 'create', table: 'structure_process', ouput: [], rest: ['idStrucProc'],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'upd-structure-process', action: 'update', table: 'structure_process', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'structure-process-detail', action: 'list', table: 'detail_struc_proc', ouput: [], rest: [],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'struc-detail-by-id', action: 'list', table: 'detail_struc_proc', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },   
    {
      request: 'rgt-structure-process-detail', action: 'create', table: 'detail_struc_proc', ouput: [], rest: ['idDetStrpro'],
      params: [],
      conditions: { type: 'static', params: [], operator: '', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    },
    {
      request: 'upd-structure-process-detail', action: 'update', table: 'detail_struc_proc', ouput: [], rest: [],
      params: [],
      conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
      returning: [],
      type: 'parametric',
      query: ''
    }
];
  
module.exports = requestsSet;