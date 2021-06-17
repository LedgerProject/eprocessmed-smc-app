import { Component, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';

// SERVICES
import { PatientsService } from '../../../service-mngmt/patients.service';
import { GeneralService } from '../../../service-mngmt/general.service';
import { BlockchainService } from '../../../service-mngmt/blockchain.service';
import { AuthService } from '../../../security/services/auth.service';

export interface PatientModel {
  idPatient?: string;
  noClinicHistory?: string;
  dni?: string;
  picture?: string;
  namePatient?: string;
  lastname?: string;
  idCatGender?: string;
  idCatLanguaje?: string;
  birthDate?: string;
  idCatCivilstatus?: string;
  address?: string;
  mail?: string;
  idCatCountry?: string;
  phone?: string;
  idEstablishment?: string;
  legalRepresentative?: string;
  dniRepLegal?: string;
  nameRepLegal?: string;
  lastnameRepLegal?: string;
  addressRepLegal?: string;
  mailRepLegal?: string;
  phoneRepLegal?: string;
  emergencyContact?: string;
  idCatRelationshipeme?: string;
  nameEmecon?: string;
  lastnameEmecon?: string;
  phoneEmecon?: string;
  addressEmecon?: string;
  idCatGenderEmecon?: string;
  idUserCreate?: number;
}

export interface SelectedValues {
  countries: string;
  provinces: string;
  cities: string;
  idCatGender: string;
  idCatLanguaje: string;
  idCatCivilstatus: string;
  idEstablishment: string;
  legalRepresentative: string;
  idCatRelationshipeme: string;
  idCatGenderEmecon: string;
}

export interface Encrypted {
  noClinicHistory?: string;
  dni?: string;
  namePatient?: string;
  lastname?: string;
  address?: string;
  mail?: string;
  phone?: string;
  legalRepresentative?: string;
  dniRepLegal?: string;
  nameRepLegal?: string;
  lastnameRepLegal?: string;
  addressRepLegal?: string;
  mailRepLegal?: string;
  phoneRepLegal?: string;
  nameEmecon?: string;
  lastnameEmecon?: string;
  phoneEmecon?: string;
  addressEmecon?: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent  implements AfterViewInit {

  displayedColumns: string[] = [
    'action',
    'id_patient',
    'no_clinic_history',
    'dni',
    'picture',
    'name_patient',
    'lastname',
    // 'id_cat_gender',
    // 'id_cat_languaje',
    'birth_date',
    // 'id_cat_civilstatus',
    'address',
    'mail',
    // 'id_cat_country',
    'phone',
    'id_establishment',
    'legal_representative',
    'dni_rep_legal',
    'name_rep_legal',
    'lastname_rep_legal',
    'address_rep_legal',
    'mail_rep_legal',
    'phone_rep_legal',
    // 'emergency_contact',
    // 'id_cat_relationshipeme',
    // 'name_emecon',
    // 'lastname_emecon',
    // 'phone_emecon',
    // 'address_emecon',
    // 'id_cat_gender_emecon'
  ];
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public collector: any;
  public patientsListActive: boolean;
  public btnConfirmActive: boolean;
  public countries!: [any];
  public gender!: [any];
  public languaje!: [any];
  public civilstatus!: [any];
  public relations!: [any];
  public dataUpload!: [any];
  
  public patients: any;
  public btnPatientsActions: any;
  public btn:any;
  public btnclick:any;
  public readonlyEdit!: boolean;
  public customers: any;
  public stablishment: any;
  public patientsModel!: PatientModel;

  public dataSesion: any;
  public idUser: string | null;

  //variables para insert de data
  public sltValues!: SelectedValues;
  public encrypted!: Encrypted;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor(
    private generalService: GeneralService, 
    private patientsService: PatientsService, 
    private blockchainService: BlockchainService, 
    private dialog: MatDialog,
    private authService: AuthService ) {
    this.stablishment = [];
    this.collector = [];
    this.patientsListActive = true;
    this.patients = [];
    this.btnConfirmActive = true;
    this.btnPatientsActions = {
      color: '',
      name: '',
      value: ''
    };
    //proceso que llena el data table y permite filtro y paginacion
    this.dataSource = new MatTableDataSource(this.patients);
    this.paginator=ViewChild(MatPaginator);
    this.sort= ViewChild(MatSort);
    this.initialAsyncFunctions();

    this.dataSesion = this.authService.getDataSesion();
    this.idUser = this.dataSesion.id;

  }

  ngAfterViewInit = async () =>{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initialCollectors = async () => {
    this.readonlyEdit = false;
    this.patientsModel = {
      idPatient: '',
      noClinicHistory: '',
      dni: '',
      picture: '',
      namePatient: '',
      lastname: '',
      idCatGender: '',
      idCatLanguaje: '',
      birthDate: '',
      idCatCivilstatus: '',
      address: '',
      mail: '',
      idCatCountry: '',
      phone: '',
      idEstablishment: '',
      legalRepresentative: '',
      dniRepLegal: '',
      nameRepLegal: '',
      lastnameRepLegal: '',
      addressRepLegal: '',
      mailRepLegal: '',
      phoneRepLegal: '',
      emergencyContact: '',
      idCatRelationshipeme: '',
      nameEmecon: '',
      lastnameEmecon: '',
      phoneEmecon: '',
      addressEmecon: '',
      idCatGenderEmecon: ''
    };
    this.sltValues = {
      countries: '',
      provinces: '',
      cities: '',
      idCatGender: '',
      idCatLanguaje: '',
      idCatCivilstatus: '',
      idEstablishment: '',
      legalRepresentative: '',
      idCatRelationshipeme: '',
      idCatGenderEmecon: ''
    };
  }

  initialAsyncFunctions = async () => {
    await this.initialCollectors();
    await this.getCatalogs({ request: "catalogs" });
    await this.getPatients({ request: "patients" });
    await this.getCustomer({ request: "customers" });
    await this.getStablis({ request: "establishment" });
  }

  switchOnClick =async (event: any) => {
    let eventTargetName;
    const innerHtml = event.target.innerHTML;
    if (event.target.name !== undefined) {
      eventTargetName = event.target.name;
    } else{
      eventTargetName = innerHtml;
    }
    switch (event.target.id) {
      case 'btnNew':
        await this.initialCollectors();
        this.switchJsonParse(this.countries,'0','countries','true', '');
        this.switchJsonParse(this.gender,'0','gender','true', '');
        this.switchJsonParse(this.languaje,'0','languaje','true', '');
        this.switchJsonParse(this.civilstatus,'0','civilstatus','true', '');
        this.switchJsonParse(this.relations,'0','relations','true', '');
        this.switchJsonParse(this.dataUpload ,'0','dataUpload','true', '');
        this.btnPatientsActions = {
          color: 'primary',
          name: 'Create',
          value: ''
        }
        this.show();
      break;
      case 'btnModify':
          await this.getPatientsByid(event.target.value);
          this.btnPatientsActions = {
            color: 'accent',
            name: 'Modify',
            value: event.target.value
          };
        break;
      case 'btnDelete':
          this.getPatientsByid(event.target.value);
          this.btnPatientsActions = {
            color: 'accent',
            name: 'Delete',
            value: event.target.value
          }
          // this.show();
        break;
      case 'btnConfirm': // botones en el CONTENT REGISTER, UPDATE, DELETE
          switch (eventTargetName) {
            case 'Create':
                this.createPatient(event.target.id);
              break;
            case 'Modify':
                this.updatePatient(event.target.value, event.target.id);
              break;
            case 'Delete':
                this.openDialog(event.target.value, event.target.id);
              break;
          }
        break;        
    }
  }

  getCatalogs = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            const countries = answer.resp.find((catalog: any) => catalog.description === "countries" );
            const gender = answer.resp.find((catalog: any) => catalog.description === "gender" );
            const languaje = answer.resp.find((catalog: any) => catalog.description === "languaje" );
            const civilstatus = answer.resp.find((catalog: any) => catalog.description === "civilstatus" );
            const relations = answer.resp.find((catalog: any) => catalog.description === "relations" );
            const dataUpload = answer.resp.find((catalog: any) => catalog.description === "dataUploadPat" );
            this.countries = countries.data_jb;
            this.gender = gender.data_jb;
            this.languaje = languaje.data_jb;
            this.civilstatus = civilstatus.data_jb;
            this.relations = relations.data_jb;
            this.dataUpload = dataUpload.data_jb;
            this.selectBuilder();
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getCustomer = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.find((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.customers = answer.resp;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getStablis = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.stablishment = answer.resp;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getPatients = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            const patients = answer.resp;
            this.patients = patients.filter((pat: any) => pat.id_user_create === `${this.idUser}`);
            this.dataSource = new MatTableDataSource(this.patients);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getPatientsByid(id:any): void {
    const dataSet = {
      request: 'pat-by-id',
      data: {idPatient: id}
    };  
    this.generalService.queryGeneral(dataSet).subscribe(
      resp => {
        const patById = resp.find((dta: any) => dta.ouput === 'pat-by-id');
        const answer = patById.answer;
        if (answer.correct) {
          const patients = answer.resp[0];
          this.sltValues = {
            countries: patients.id_cat_country.countries,
            provinces: patients.id_cat_country.provinces,
            cities: patients.id_cat_country.cities,
            idCatGender: patients.id_cat_gender.idCatGender,
            idCatLanguaje: patients.id_cat_languaje.idCatLanguaje,
            idCatCivilstatus: patients.id_cat_civilstatus.idCatCivilstatus,
            idEstablishment: patients.id_establishment,
            legalRepresentative: patients.legal_representative,
            idCatRelationshipeme: patients.id_cat_relationshipeme.idCatRelationshipeme,
            idCatGenderEmecon: patients.id_cat_gender_emecon.idCatGenderEmecon
          };
          this.patientsModel = {
            idPatient: patients.id_patient,
            noClinicHistory: patients.no_clinic_history,
            dni: patients.dni,
            picture: patients.picture,
            namePatient: patients.name_patient,
            lastname: patients.lastname,
            idCatGender: '',
            idCatLanguaje: '',
            birthDate: patients.birth_date,
            idCatCivilstatus: '',
            address: patients.address,
            mail: patients.mail,
            idCatCountry: '',
            phone: patients.phone,
            idEstablishment: '',
            legalRepresentative: '',
            dniRepLegal: patients.dni_rep_legal,
            nameRepLegal: patients.name_rep_legal,
            lastnameRepLegal: patients.lastname_rep_legal,
            addressRepLegal: patients.address_rep_legal,
            mailRepLegal: patients.mail_rep_legal,
            phoneRepLegal: patients.phone_rep_legal,
            emergencyContact: patients.emergency_contact,
            idCatRelationshipeme: '',
            nameEmecon: patients.name_emecon,
            lastnameEmecon: patients.lastname_emecon,
            phoneEmecon: patients.phone_emecon,
            addressEmecon: patients.address_emecon,
            idCatGenderEmecon: ''
          };
          let encrypted = {
            noClinicHistory: patients.no_clinic_history,
            dni: patients.dni,
            namePatient: patients.name_patient,
            lastname: patients.lastname,
            address: patients.address,
            mail: patients.mail,
            phone: patients.phone,
            legalRepresentative: patients.legal_representative,
            dniRepLegal: patients.dni_rep_legal,
            nameRepLegal: patients.name_rep_legal,
            lastnameRepLegal: patients.lastname_rep_legal,
            addressRepLegal: patients.address_rep_legal,
            mailRepLegal: patients.mail_rep_legal,
            phoneRepLegal: patients.phone_rep_legal,
            nameEmecon: patients.name_emecon,
            lastnameEmecon: patients.lastname_emecon,
            phoneEmecon: patients.phone_emecon,
            addressEmecon: patients.address_emecon
          }
          this.decrypt(encrypted, patients.id_establishment);
          this.readonlyEdit = true;
          this.show();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async selectBuilder(){
    this.switchJsonParse(this.countries,'0','countries','true', '');
    this.switchJsonParse(this.gender,'0','gender','true', '');
    this.switchJsonParse(this.languaje,'0','languaje','true', '');
    this.switchJsonParse(this.civilstatus,'0','civilstatus','true', '');
    this.switchJsonParse(this.relations,'0','relations','true', '');
    this.switchJsonParse(this.dataUpload,'0','dataUpload','true', '');
  }

  createPatient = async (namebutton: any) => {
    this.lockButton(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.patientsModel.idCatCountry = JSON.stringify(idLocation);
    this.patientsModel.idCatGender = JSON.stringify({idCatGender: this.sltValues.idCatGender});
    this.patientsModel.idCatLanguaje = JSON.stringify({idCatLanguaje: this.sltValues.idCatLanguaje});
    this.patientsModel.idCatCivilstatus = JSON.stringify({idCatCivilstatus: this.sltValues.idCatCivilstatus});
    this.patientsModel.idEstablishment = this.sltValues.idEstablishment;
    this.patientsModel.legalRepresentative = this.sltValues.legalRepresentative;
    this.patientsModel.idCatRelationshipeme = JSON.stringify({idCatRelationshipeme: this.sltValues.idCatRelationshipeme});
    this.patientsModel.idCatGenderEmecon = JSON.stringify({idCatGenderEmecon: this.sltValues.idCatGenderEmecon});
    this.patientsModel.idUserCreate = parseInt(this.dataSesion.id);

    const data = {
      request: 'rgt-patients',
      data: this.patientsModel
    };
    await this.patientsService.crtUpdPatients(data).subscribe(
      resp => {
        if (resp.correct) {
          location.reload(); //return window.alert("THE RECORD WAS CORRECTLY KEPT");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //procedimiento que obtiene el registro de la tabla a y lo modifica
  updatePatient = async (id: any, namebutton: any) => {
    this.lockButton(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.patientsModel.idCatGender = JSON.stringify({idCatGender: this.sltValues.idCatGender});
    this.patientsModel.idCatLanguaje = JSON.stringify({idCatLanguaje: this.sltValues.idCatLanguaje});
    this.patientsModel.idCatCivilstatus = JSON.stringify({idCatCivilstatus: this.sltValues.idCatCivilstatus});
    this.patientsModel.idEstablishment = this.sltValues.idEstablishment;
    this.patientsModel.legalRepresentative = this.sltValues.legalRepresentative;
    this.patientsModel.idCatRelationshipeme = JSON.stringify({idCatRelationshipeme: this.sltValues.idCatRelationshipeme});
    this.patientsModel.idCatGenderEmecon = JSON.stringify({idCatGenderEmecon: this.sltValues.idCatGenderEmecon});
    this.patientsModel.idCatCountry = JSON.stringify(idLocation);
    const data = {
      request: 'upd-patients',
      data: this.patientsModel
    };
    await this.patientsService.crtUpdPatients(data).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          location.reload(); // return window.alert("THE RECORD WAS CORRECTLY KEPT");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

   //procedimiento que obtiene el registro de la tabla a y lo modifica
  deletePatient = async (id:any, namebutton:any) => {
    this.lockButton(namebutton);
    const data = {
      request: 'upd-patients',
      data: {
        idPatient: id,
        status: '0'
      }
    };
    await this.generalService.queryGeneral(data).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          location.reload();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
  decrypt = async (data: any, idEstablishment: any) => {
    const dataSet = {
      request: 'estab-by-id',
      data: {
        idEstablishment
      }
    };
    await this.generalService.queryGeneral(dataSet).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === dataSet.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          const hash = answer.resp[0].hash;
          const dataSet = {
            request: 'decrypt',
            data: { data, hash }
          };
          this.blockchainService.decrypt(dataSet).subscribe(
            resp => {
              if (resp.correct) {// for respData
                const respData: any = resp.resp.data;
                this.patientsModel.noClinicHistory = respData.noClinicHistory,
                this.patientsModel.dni = respData.dni,
                this.patientsModel.namePatient = respData.namePatient,
                this.patientsModel.lastname = respData.lastname,
                this.patientsModel.address = respData.address,
                this.patientsModel.mail = respData.mail,
                this.patientsModel.phone = respData.phone,
                this.patientsModel.legalRepresentative = respData.legalRepresentative,
                this.patientsModel.dniRepLegal = respData.dniRepLegal,
                this.patientsModel.nameRepLegal = respData.nameRepLegal,
                this.patientsModel.lastnameRepLegal = respData.lastnameRepLegal,
                this.patientsModel.addressRepLegal = respData.addressRepLegal,
                this.patientsModel.mailRepLegal = respData.mailRepLegal,
                this.patientsModel.phoneRepLegal = respData.phoneRepLegal,
                this.patientsModel.nameEmecon = respData.nameEmecon,
                this.patientsModel.lastnameEmecon = respData.lastnameEmecon,
                this.patientsModel.phoneEmecon = respData.phoneEmecon,
                this.patientsModel.addressEmecon = respData.addressEmecon
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /* getCatalogById */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //metodo que oculta o muestra los elementos de registro, update, delete
  show(): void {
    if (this.patientsListActive) {
      this.patientsListActive = false;
      this.btnConfirmActive = true;
    } else {
      this.patientsListActive = true;
    }
  }

  lockButton(namebutton:any): void {
    switch (namebutton) {
      case 'btnConfirm':
          this.btnConfirmActive = false;
        break;
    }
  }

  // Modal para crear eliminar registro
  openDialog(id:any, namebutton:any): void {
    var titleDlg = '';
      titleDlg = 'Do you want to delete this record?';


    const dialogRef = this.dialog.open(DialogMsgComponent, {
      width: '400px',
      data: {
        titleDlg,
        action: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'delete':
              this.deletePatient(id, namebutton);
            break;
        }
      }
    });

  }

  // Recorre JSON de Catalogos general.
  switchJsonParse = async (data: [any], traceId: string, name:string, principal:string, paramName:string) => {
    await this.childJson([data], traceId, name, principal, paramName);
  }

  childJson = async (data: [any], strTraceId: string, name:string, principal:string, paramName:string) => {
    const traceIdStr: any = strTraceId.split(',');
    const traceId = traceIdStr.map(this.parseInter);
    const id = traceId[0];
    const record = data[id];
    var collector: any = [];
    var dta: any = [];
    traceId.splice(0, 1);
    if (paramName === '') {
      paramName = 'name';
    }

    if(traceId.length > 0) {
      const strId = traceId.toString();
      await this.childJson(record.children, strId, name, principal, paramName);
    } else {
      if(principal == 'true') {
        dta= record.children;
      }else{
        if (name !== '') {
          const dtaChid = record.children.find((param: any) => param.name === name);   
          if (dtaChid.children !== undefined) {
            dta = dtaChid.children;
          }          
        }
      }
      dta.forEach( async (datachild: any) => {
        const param: any = datachild.children.find((param: any) => param.name === paramName);
        if (param !== undefined) {
          const idChild = `${datachild.father},${param.id}`;
          const value = param.value;
          collector.push({id: idChild, value});
        }
      });
      if (collector.length > 0) {
        this.collector[name] = collector;
      }
    }
  }

  parseInter(str: any): number {
    return parseInt(str);
  }

}