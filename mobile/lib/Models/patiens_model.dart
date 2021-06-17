class Resp {
  int idPatient;
  String noClinicHistory;
  String dni;
  String picture;
  String namePatient;
  String lastname;
  IdCatGender idCatGender;
  IdCatLanguaje idCatLanguaje;
  String birthDate;
  IdCatCivilstatus idCatCivilstatus;
  String address;
  String mail;
  IdCatCountry idCatCountry;
  String phone;
  String idEstablishment;
  String legalRepresentative;
  String dniRepLegal;
  String nameRepLegal;
  String lastnameRepLegal;
  String addressRepLegal;
  String mailRepLegal;
  String phoneRepLegal;
  String emergencyContact;
  IdCatRelationshipeme idCatRelationshipeme;
  String nameEmecon;
  String lastnameEmecon;
  String phoneEmecon;
  String addressEmecon;
  IdCatGenderEmecon idCatGenderEmecon;
  String creationDate;
  String modificationDate;
  String idUserCreate;
  String idUserModify;
  String status;

  Resp({
    this.idPatient,
    this.noClinicHistory,
    this.dni,
    this.picture,
    this.namePatient,
    this.lastname,
    this.idCatGender,
    this.idCatLanguaje,
    this.birthDate,
    this.idCatCivilstatus,
    this.address,
    this.mail,
    this.idCatCountry,
    this.phone,
    this.idEstablishment,
    this.legalRepresentative,
    this.dniRepLegal,
    this.nameRepLegal,
    this.lastnameRepLegal,
    this.addressRepLegal,
    this.mailRepLegal,
    this.phoneRepLegal,
    this.emergencyContact,
    this.idCatRelationshipeme,
    this.nameEmecon,
    this.lastnameEmecon,
    this.phoneEmecon,
    this.addressEmecon,
    this.idCatGenderEmecon,
    this.creationDate,
    this.modificationDate,
    this.idUserCreate,
    this.idUserModify,
    this.status,
  });
}

class IdCatCivilstatus {
  String idCatCivilstatus;

  IdCatCivilstatus({
    this.idCatCivilstatus,
  });
}

class IdCatCountry {
  String cities;
  String countries;
  String provinces;

  IdCatCountry({
    this.cities,
    this.countries,
    this.provinces,
  });
}

class IdCatGender {
  String idCatGender;

  IdCatGender({
    this.idCatGender,
  });
}

class IdCatGenderEmecon {
  String idCatGenderEmecon;

  IdCatGenderEmecon({
    this.idCatGenderEmecon,
  });
}

class IdCatLanguaje {
  String idCatLanguaje;

  IdCatLanguaje({
    this.idCatLanguaje,
  });
}

class IdCatRelationshipeme {
  String idCatRelationshipeme;

  IdCatRelationshipeme({
    this.idCatRelationshipeme,
  });
}
