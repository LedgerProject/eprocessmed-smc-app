class Process {
  List<Resp> items = [];
  Process();

  Process.formJsonList(List<dynamic> jsonlist) {
    if (jsonlist == null) return;

    for (var item in jsonlist) {
      final resp = new Resp.fromJsonMap(item);
      items.add(resp);
    }
  }
}

class Answer {
  bool correct;
  List<Resp> resp;

  Answer({
    this.correct,
    this.resp,
  });
}

class Resp {
  int idCatalog;
  String description;
  IdCatLanguage idCatLanguage;
  StructureJb structureJb;
  List<StructureJb> dataJb;
  String creationDate;
  String modificationDate;
  String idUserCreate;
  String idUserModify;
  String status;

  Resp({
    this.idCatalog,
    this.description,
    this.idCatLanguage,
    this.structureJb,
    this.dataJb,
    this.creationDate,
    this.modificationDate,
    this.idUserCreate,
    this.idUserModify,
    this.status,
  });

  Resp.fromJsonMap(Map<String, dynamic> json) {
    idCatalog = json['id_catalog'];
    description = json['description'];
    idCatLanguage = json['id_cat_languaje'];
    structureJb = json['structure_jb'];
    dataJb = json['data_jb'];
    creationDate = json['creation_data'];
    modificationDate = json['modification_data'];
    idUserCreate = json['id_user_create'];
    idUserModify = json['id_user_modify'];
    status = json['status'];
  }
}

class Child {
  int id;
  String name;
  Type type;
  String value;
  List<int> father;
  List<StructureJb> children;
  Language language;
  bool required;
  List<int> fatherStrct;
  Child({
    this.id,
    this.name,
    this.type,
    this.value,
    this.father,
    this.children,
    this.language,
    this.required,
    this.fatherStrct,
  });

  Child.fromJsonMap(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    type = json['type'];
    value = json['value'];
    father = json['father'];
    children = json['children'];
    language = json['language'];
    required = json['required'];
    fatherStrct = json['fatherStrct'];
  }
}

class StructureJb {
  int id;
  Name name;
  Type type;
  String value;
  List<int> father;
  List<Child> children;
  Language language;
  String required;
  List<int> fatherStrct;

  StructureJb({
    this.id,
    this.name,
    this.type,
    this.value,
    this.father,
    this.children,
    this.language,
    this.required,
    this.fatherStrct,
  });

  StructureJb.fromJsonMap(Map<String, dynamic> json) {
    id = json[''];
    name = json[''];
    type = json[''];
    value = json[''];
    father = json[''];
    children = json[''];
    language = json[''];
    required = json[''];
    fatherStrct = json[''];
  }
}

enum Language { ES }

enum Type { JSON, VARCHAR }

enum Name { SPECIALTIES, NAME, PROCEDURES }

class IdCatLanguage {
  String id;

  IdCatLanguage({
    this.id,
  });
}
