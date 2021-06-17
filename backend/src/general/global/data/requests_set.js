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
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'catl-by-id', action: 'list', table: 'catalogs', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCatalog', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'catl-by-desc', action: 'list', table: 'catalogs', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'description', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },   
  {
    request: 'rgt-catalogs', action: 'create', table: 'catalogs', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-catalogs', action: 'update', table: 'catalogs', ouput: [], rest: ['idCatalog'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCatalog', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'dlt-catalogs', action: 'delete', table: 'catalogs', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'users', action: 'list', table: 'users', ouput: [], rest: ['password_user'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'usr-by-estab', action: 'list', table: 'users', ouput: [], rest: ['password_user'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'},{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },  
  {
    request: 'rgt-users', action: 'create', table: 'users', ouput: [], rest: ['idUser'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: ['id_user'],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-users', action: 'update', table: 'users', ouput: [], rest: ['idUser', 'dni', 'idEstablishment'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idUser', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'usr-by-id', action: 'list', table: 'users', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idUser', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'usr-by-dni', action: 'list', table: 'users', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'dni', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'usr-by-login', action: 'list', table: 'users', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'login', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },  
  {
    request: 'usr-by-login-pass', action: 'list', table: 'users', ouput: ['id_user','dni','name','lastname','mail','phone'], rest: [],
    params: [],
    conditions: {
      type: 'parametric', 
      params: [{param: 'login', value: '', operator: '=', type: 'parametric'},{param: 'password', value: '', operator: '=', type: 'parametric'}], 
      operator: 'AND', static: '' 
    },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'user-by-phone', action: 'list', table: 'users', ouput: [], rest: [],
    params: [],
    conditions: {
      type: 'parametric',
      params: [
        {param: 'phone', value: '', operator: '=', type: 'parametric'},
        {param: 'codePhone_c', value: '', operator: '=', type: 'parametric'}],
      operator: 'AND',
      static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },    
  {
    request: 'parameters', action: 'list', table: 'parameters', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'params-by-name', action: 'list', table: 'parameters', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'name', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'customers', action: 'list', table: 'customer', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'cust-by-domine', action: 'list', table: 'domains_view', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'url', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },  
  {
    request: 'establishment', action: 'list', table: 'establishment', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'estab-by-cust', action: 'list', table: 'establishment', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCustomer', value: '', operator: '=', type: 'parametric'},{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },  
  {
    request: 'estab-by-id', action: 'list', table: 'establishment', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'principal-estab', action: 'list', table: 'establishment', ouput: [], rest: [],
    params: [],
    conditions: {
      type: 'parametric',
      params: [
        {param: 'idCustomer', value: '', operator: '=', type: 'parametric'},
        {param: 'principal', value: true, operator: '=', type: 'static'}
      ],
      operator: 'AND',
      static: '' 
    }, returning: [], type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },    
  {
    request: 'rgt-establishment', action: 'create', table: 'establishment', ouput: [], rest: ['idEstablishment'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: ['id_establishment'],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-ncrypt-establ', action: 'update', table: 'establishment', ouput: [], rest: ['idEstablishment'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },    
  {
    request: 'upd-establishment', action: 'update', table: 'establishment', ouput: [], rest: ['idEstablishment', 'dni', 'hash', 'urlhash'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'patients', action: 'list', table: 'patients', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: ''  },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'pat-by-id', action: 'list', table: 'patients', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idPatient', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },    
  {
    request: 'rgt-patients', action: 'create', table: 'patients', ouput: [], rest: ['idPatient'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: ['id_patient'],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-patients', action: 'update', table: 'patients', ouput: [], rest: ['idPatient', 'dni', 'idEstablishment'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idPatient', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'dlt-patients', action: 'delete', table: 'patients', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'pat-by-stablishment', action: 'list', table: 'patients', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstablishment', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'structure-process', action: 'list', table: 'structure_process', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'struc-by-id', action: 'list', table: 'structure_process', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCatProcess_P', value: '', operator: '=', type: 'parametric'},
    {param: 'idCatProcess_S', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'process-by-id', action: 'list', table: 'structure_process', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCatProcess', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },   
  {
    request: 'rgt-structure-process', action: 'create', table: 'structure_process', ouput: [], rest: ['idStrucProc'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-structure-process', action: 'update', table: 'structure_process', ouput: [], rest: ['idStrucProc'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'structure-process-detail', action: 'list', table: 'detail_struc_proc', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'struc-detail-by-id', action: 'list', table: 'detail_struc_proc', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },   
  {
    request: 'rgt-structure-process-detail', action: 'create', table: 'detail_struc_proc', ouput: [], rest: ['idDetStrpro'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-structure-process-detail', action: 'update', table: 'detail_struc_proc', ouput: [], rest: ['idStrucProc'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idStrucProc', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'proc-estab', action: 'list', table: 'specialty_establishment', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'rgt-proc-estab', action: 'create', table: 'specialty_establishment', ouput: [], rest: ['idEstSpec'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-proc-estab', action: 'update', table: 'specialty_establishment', ouput: [], rest: ['idEstSpec', 'idEstablishment'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idEstSpec', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'rol-estab', action: 'list', table: 'rol_establishment', ouput: [], rest: [],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'rgt-rol-estab', action: 'create', table: 'rol_establishment', ouput: [], rest: ['idRol'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-rol-estab', action: 'update', table: 'rol_establishment', ouput: [], rest: ['idRol', 'idEstablishment', 'idCatRoluser'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idRol', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'get-user-forms', action: 'list', table: 'forms_data', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'status', value: '1', operator: '=', type: 'static'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'frmdata-by-id', action: 'list', table: 'forms_data', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idRespondents', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'current-patients-forms', action: 'list', table: 'forms_data', ouput: [], rest: [],
    params: [],
    conditions: {
      type: 'parametric',
      params: [
        {param: 'idRespondents', value: '', operator: '=', type: 'parametric'},
        {param: 'idCustf', value: '', operator: '=', type: 'parametric'}
      ],
      operator: 'AND', static: ''
    }, returning: [], type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'rgt-form-data', action: 'create', table: 'forms_data', ouput: [], rest: ['idFrmdata'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'cust-form-by-id', action: 'list', table: 'customers_forms', ouput: ['description', 'description', 'structure', 'id_customer'], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idCustomer', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'current-cust-forms', action: 'list', table: 'customers_forms_view', ouput: [], rest: [],
    params: [],
    conditions: {
      type: 'parametric', 
      params: [
        {param: 'idCustomer', value: '', operator: '=', type: 'parametric'},
        {param: 'dateInit', value: '', operator: '<=', type: 'parametric'},
        {param: 'dateEnd', value: '', operator: '>=', type: 'parametric'}
      ], 
      operator: 'AND', static: '' 
    }, returning: [], type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'rgt-consent', action: 'create', table: 'consent', ouput: [], rest: ['idConsent'],
    params: [],
    conditions: { type: 'static', params: [], operator: '', static: '' },
    returning: ['id_consent'],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'upd-consent', action: 'update', table: 'consent', ouput: [], rest: ['idConsent'],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idConsent', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'get-consent-patient-homePen', action: 'list', table: 'consent', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idPatient', value: '', operator: '=', type: 'parametric'},
    {param: 'patientCompleted', value: '', operator: '=', type: 'parametric'}, {param: 'homeFirm', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'get-consent-Specialist', action: 'list', table: 'consent', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idSpecialist', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  },
  {
    request: 'get-consent-by-Id', action: 'list', table: 'consent', ouput: [], rest: [],
    params: [],
    conditions: { type: 'parametric', params: [{param: 'idConsent', value: '', operator: '=', type: 'parametric'}], operator: 'AND', static: '' },
    returning: [],
    type: 'parametric',
    query: '',
    orderBy: '',
    order: 'ASC',
    limit: null
  }
];
  
module.exports = requestsSet;