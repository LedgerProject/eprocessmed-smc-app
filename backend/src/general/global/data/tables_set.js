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
        {name: "code_phone ->> 'codePhone'", param: 'codePhone_c', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone', param: 'phone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_google', param: 'idGoogle', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_hash_alastria', param: 'idHashAlastria', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_roluser', param: 'idCatRoluser', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'user_structure', param: 'userStructure', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_accesstype', param: 'idCatAccesstype', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_specialist', param: 'idSpecialist', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_cat_notification', param: 'idCatNotification', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'key_zoom', param: 'keyZoom', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'reg_status', param: 'regStatus', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'code_otp', param: 'codeOtp', default: null, type: 'num', key: false, required: true, encrypted: false},
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
        {name: 'canal_domain_access', param: 'canalDomainAccess', default: '', type: 'str', key: false, required: true, encrypted: false},// domain json
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
      table: 'domains_view',
      columns: [
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'description', param: 'description', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'url', param: 'url', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'icons', param: 'icons', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'module', param: 'module', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'text_body', param: 'text_body', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'text_title', param: 'text_title', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'authentication', param: 'authentication', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'time_zone', param: 'timeZone', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_languaje', param: 'idCatLanguaje', default: '', type: 'str', key: false, required: true, encrypted: false},
      ]      
    },
    {
      table: 'establishment',
      columns: [
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'description', param: 'description', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'dni', param: 'dni', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'address', param: 'address', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'phone', param: 'phone', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'mail', param: 'mail', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'id_cat_location', param: 'idLocation', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_type', param: 'idType', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'contact_name', param: 'contactName', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'contact_phone', param: 'contactPhone', default: null, type: 'str', key: false, required: true, encrypted: true},
        {name: 'specialist_sign', param: 'specialistSign', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash', param: 'hash', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'url_hash', param: 'urlhash', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'patient_load', param: 'patientLoad', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_patient_load', param: 'idCatPatientLoad', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_patient_val', param: 'idCatPatientVal', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'principal', param: 'principal', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'patients',
      columns: [
        {name: 'id_patient', param: 'idPatient', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'no_clinic_history', param: 'noClinicHistory', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'dni', param: 'dni', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'picture', param: 'picture', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name_patient', param: 'namePatient', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'lastname', param: 'lastname', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'id_cat_gender', param: 'idCatGender', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_languaje', param: 'idCatLanguaje', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'birth_date', param: 'birthDate', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_cat_civilstatus', param: 'idCatCivilstatus', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'address', param: 'address', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'mail', param: 'mail', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'id_cat_country', param: 'idCatCountry', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'phone', param: 'phone', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'id_establishment', param: 'idEstablishment', default: '', type: 'num', key: false, required: true, encrypted: false},
        {name: 'legal_representative', param: 'legalRepresentative', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'dni_rep_legal', param: 'dniRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'name_rep_legal', param: 'nameRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'lastname_rep_legal', param: 'lastnameRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'address_rep_legal', param: 'addressRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'mail_rep_legal', param: 'mailRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'phone_rep_legal', param: 'phoneRepLegal', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'emergency_contact', param: 'emergencyContact', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_relationshipeme', param: 'idCatRelationshipeme', default: '', type: 'str', key: false, required: true, encrypted: false},
        {name: 'name_emecon', param: 'nameEmecon', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'lastname_emecon', param: 'lastnameEmecon', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'phone_emecon', param: 'phoneEmecon', default: '', type: 'str', key: false, required: true, encrypted: true},
        {name: 'address_emecon', param: 'addressEmecon', default: '', type: 'str', key: false, required: true, encrypted: true},
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
    },
    {
      table: 'specialty_establishment',
      columns: [
        {name: 'id_est_spec', param: 'idEstSpec', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'specialties', param: 'specialties', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'rol_establishment',
      columns: [
        {name: 'id_rol', param: 'idRol', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_cat_roluser', param: 'idCatRoluser', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'modules', param: 'modules', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'forms_data',
      columns: [
        {name: 'id_frmdata', param: 'idFrmdata', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'name', param: 'name', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'description', param: 'description', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure', param: 'structure', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_respondents', param: 'idRespondents', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_custf', param: 'idCustf', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'diagnosis', param: 'diagnosis', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'presumption', param: 'presumption', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'operation', param: 'operation', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'date_replication', param: 'dateReplication', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'diagnostic_detail', param: 'diagnosticDetail', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_specialist', param: 'idSpecialist', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'total_weight_patient', param: 'totalWeightPatient', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'total_weight_diagnosis', param: 'totalWeightDiagnosis', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'hash_patient', param: 'hashPatient', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash_diagnosis', param: 'hashDiagnosis', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'result_patient', param: 'resultPatient', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'result_diagnosis', param: 'resultDiagnosis', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_establishment', param: 'idEstablishment', default: null, type: 'num', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'customers_forms',
      columns: [
        {name: 'id_custf', param: 'idCustf', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'name', param: 'name', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'description', param: 'description', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure', param: 'structure', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_form', param: 'idForm', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_frmset', param: 'idFrmset', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'periodic', param: 'periodic', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'weight_values', param: 'weightValues', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'form_weight', param: 'formWeight', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'customers_forms_view',
      columns: [
        {name: 'id_custf', param: 'idCustf', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'name', param: 'name', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'description', param: 'description', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'structure', param: 'structure', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_customer', param: 'idCustomer', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_form', param: 'idForm', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_frmset', param: 'idFrmset', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'weight_values', param: 'weightValues', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'form_weight', param: 'formWeight', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'date_init', param: 'dateInit', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'date_end', param: 'dateEnd', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'one_time', param: 'oneTime', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'days', param: 'days', default: null, type: 'str', key: false, required: true, encrypted: false}        
      ]
    },
    {
      table: 'parameters',
      columns: [
        {name: 'id_prm', param: 'IdPrm', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'name', param: 'name', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'params', param: 'params', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    },
    {
      table: 'consent',
      columns: [
        {name: 'id_consent', param: 'idConsent', default: null, type: 'num', key: true, required: true, encrypted: false},
        {name: 'id_patient', param: 'idPatient', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_specialist', param: 'idSpecialist', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_cat_specialty', param: 'idCatSpecialty', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_process', param: 'idCatProcess', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_cat_risk', param: 'idCatRisk', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_video', param: 'idVideo', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'show_video', param: 'showVideo', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'firm_patient', param: 'firmPatient', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'firm_representative', param: 'firmRepresentative', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'firm_specialist', param: 'firmSpecialist', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'firm_revoked', param: 'firmRevoked', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash_fpacient', param: 'hashFpacient', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash_frepresentative', param: 'hashFrepresentative', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash_fspecialist', param: 'hashFspecialist', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'hash_frevoked', param: 'hashFrevoked', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'audio_acceptance', param: 'audioAcceptance', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'creation_date', param: 'creationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'review_date', param: 'reviewDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'acceptance_date', param: 'acceptanceDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'rejected_date', param: 'rejectedDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'url_pdf', param: 'urlPdf', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'url_audio', param: 'urlAudio', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'patient_completed', param: 'patientCompleted', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'specialist_completed', param: 'specialistCompleted', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'site', param: 'site', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'home_firm', param: 'homeFirm', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'info_otp', param: 'infoOtp', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'valid_firm_home', param: 'validFirmHome', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'path', param: 'path', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'id_user_create', param: 'idUserCreate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'status', param: 'status', default: null, type: 'str', key: false, required: true, encrypted: false},
        {name: 'modification_date', param: 'modificationDate', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'id_user_modify', param: 'idUserModify', default: null, type: 'num', key: false, required: true, encrypted: false},
        {name: 'traceability', param: 'traceability', default: null, type: 'str', key: false, required: true, encrypted: false}
      ]
    }
];

module.exports = tablesSet;