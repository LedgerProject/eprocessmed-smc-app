/*
  1.-
    name: Nombre del campo en la tabla.
    param:  Alias con que llega el dato. 
    default:  Valor por defecto en la tabla a colocar de ser requerido y no llegue.
    type: Tipo de dato que se almacena en la tabla.
    key:  Si es o no clave del registro.
    required: Si "required =  true" es "NOT NULL" en la tabla.
    encrypted: Si ha de ser encriptado o no. Si encrypted = true, se envía a la Blockchain para su encriptación antes de la carga.

  2.-
    Si type = 'jsonb' en la tabla, en la configuración se le asigna "str".

  3.-
    Si default = 'timestamp' en la configuración, se debe asignar en la carga el valor del "time" actual.
*/

const tablesSet = [
    {
      table: 'catalogs',
      columns: [
        {name: 'id_catalog', param: 'idCatalog', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'description', param: 'description', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_language', param: 'idCatLanguage', default: 0, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure_jb', param: 'structure', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'data_jb', param: 'data', default: '', type: 'str', key: false, required: false, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: 'timestamp', type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: 'timestamp', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: '1', type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'users',
      columns: [
        {name: 'id_user', param: 'idUser', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'dni', param: 'dni', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name', param: 'name', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'lastname', param: 'lastname', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'login', param: 'login', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'password_user', param: 'password', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'mail', param: 'mail', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'code_phone', param: 'codePhone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone', param: 'phone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_google', param: 'idGoogle', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_hash_alastria', param: 'idHash', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_roluser', param: 'idCatRoluser', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'user_structure', param: 'structure', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_accesstype', param: 'idCatAccesstype', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'customer',
      columns: [
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'description', param: 'description', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'canal_domain_access', param: 'canalDomainAccess', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'time_zone', param: 'timeZone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_languaje', param: 'idCatLanguaje', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: '', default: '', type: 'str', key: false, required: true, encrypted: false}
      ]      
    },
    {
      table: 'establishment',
      columns: [
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'description', param: 'description', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'dni', param: 'dni', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'address', param: 'address', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone', param: 'phone', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'mail', param: 'mail', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_location', param: 'idLocation', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_type', param: 'idType', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'contact_name', param: 'contactName', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'contact_phone', param: 'contactPhone', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'specialist_sign', param: 'specialistSign', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash', param: 'hash', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'urlhash', param: 'urlhash', default: '', type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'patients',
      columns: [
        {name: 'id_patient', param: 'idPatient', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'no_clinic_history', param: 'noClinicHistory', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'dni', param: 'dni', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'picture', param: 'picture', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name_patient', param: 'namePatient', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'lastname', param: 'lastname', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_gender', param: 'idCatGender', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_languaje', param: 'idCatLanguaje', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'birth_date', param: 'birthDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_cat_civilstatus', param: 'idCatCivilstatus', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'address', param: 'address', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'mail', param: 'mail', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_country', param: 'idCatCountry', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone', param: 'phone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'legal_representative', param: 'legalRepresentative', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'dni_rep_legal', param: 'dniRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name_rep_legal', param: 'nameRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'lastname_rep_legal', param: 'lastnameRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'address_rep_legal', param: 'addressRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'mail_rep_legal', param: 'mailRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone_rep_legal', param: 'phoneRepLegal', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'emergency_contact', param: 'emergencyContact', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_relationshipeme', param: 'idCatRelationshipeme', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name_emecon', param: 'nameEmecon', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'lastname_emecon', param: 'lastnameEmecon', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone_emecon', param: 'phoneEmecon', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'address_emecon', param: 'addressEmecon', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_gender_emecon', param: 'idCatGenderEmecon', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: '', type: 'str', key: false, required: true, encrypted: false}
      ]      
    },
    {
      table: 'structure_process',
      columns: [
        {name: 'id_struc_proc', param: 'idStrucProc', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: "id_cat_process ->> 'procedures'", param: 'idCatProcess_P', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: "id_cat_process ->> 'specialties'", param: 'idCatProcess_S', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure_screens', param: 'structureScreens', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure_header', param: 'structureHeader', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure_body', param: 'structureBody', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_formatdoc', param: 'idCatFormatdoc', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'detail_struc_proc',
      columns: [
        {name: 'id_det_strpro', param: 'idDetStrpro', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_struc_proc', param: 'idStrucProc', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'order_proc', param: 'orderProc', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'information', param: 'information', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    }    
];

module.exports = tablesSet;