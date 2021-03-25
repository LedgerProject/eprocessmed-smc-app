import { Component, ViewChild, HostListener, EventEmitter, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';

//SERVICES
import { PatientsService } from '../../../service-mngmt/services/patients.service';
import { GeneralService } from '../../../service-mngmt/services/general.service';
import { BlockchainService } from '../../../service-mngmt/services/blockchain.service';

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
}

export interface SelectedValues {
  countries: string,
  provinces: string,
  cities: string
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
    'id_cat_gender',
    'id_cat_languaje',
    'birth_date',
    'id_cat_civilstatus',
    'address',
    'mail',
    'id_cat_country',
    'phone',
    'id_establishment',
    'legal_representative',
    'dni_rep_legal',
    'name_rep_legal',
    'lastname_rep_legal',
    'address_rep_legal',
    'mail_rep_legal',
    'phone_rep_legal',
    'emergency_contact',
    'id_cat_relationshipeme',
    'name_emecon',
    'lastname_emecon',
    'phone_emecon',
    'address_emecon',
    'id_cat_gender_emecon'
  ];
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public colector: any;
  public patientsListActive: boolean;
  public btnConfirmActive: boolean;
  public countries!: [any];
  public gender!: [any];
  public languaje!: [any];
  public civilstatus!: [any];
  public relations!: [any];
  public patients: any;
  public btnPatientsActions: any;
  public btn:any;
  public btnclick:any;

  public customers: any;
  public patientsModel!: PatientModel;

  //variables para insert de data
  public sltValues!: SelectedValues;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor( 
    private generalService: GeneralService, 
    private patientsService: PatientsService, 
    private blockchainService: BlockchainService, 
    private dialog: MatDialog ) {
      
    this.colector = [];
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
      cities: ''
    };

    this.initialAsyncFunctions();
  }

  ngAfterViewInit = async () =>{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initialAsyncFunctions = async () => {
    await this.getCatalogs({ process: '', request: "catalogs" });
    await this.getPatients({ process: '', request: "patients" });
    await this.getCustomer({ process: '', request: "customers" });
    
  }

  switchOnClick =async (event: any) => {
    // botones en el datatable
    switch (event.target.id) {
      case 'btnNew':
        this.switchJsonParse(this.countries,'0','countries','true');
        this.switchJsonParse(this.gender,'0','gender','true');
        this.switchJsonParse(this.languaje,'0','languaje','true');
        this.switchJsonParse(this.civilstatus,'0','civilstatus','true');
        this.switchJsonParse(this.relations,'0','relations','true');

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
          cities: ''
        };
        this.btnPatientsActions = {
          color: 'primary',
          name: 'Create'
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
          switch (event.target.name) {
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
            this.countries = countries.data_jb;
            this.gender = gender.data_jb;
            this.languaje = languaje.data_jb;
            this.civilstatus = civilstatus.data_jb;
            this.relations = relations.data_jb;
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
          const ouput = resp.filter((res: any) => res.ouput === data.request);
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

  getPatients = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.patients = answer.resp;
            // Assign the data to the data source for the table to render
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
      process: '', 
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
            cities: patients.id_cat_country.cities
          };
          this.patientsModel = {
            idPatient: patients.id_patient,
            noClinicHistory: patients.no_clinic_history,
            dni: patients.dni,
            picture: patients.picture,
            namePatient: patients.name_patient,
            lastname: patients.lastname,
            idCatGender: patients.id_cat_gender,
            idCatLanguaje: patients.id_cat_languaje,
            birthDate: patients.birth_date,
            idCatCivilstatus: patients.id_cat_civilstatus,
            address: patients.address,
            mail: patients.mail,
            idCatCountry: patients.id_cat_country,
            phone: patients.phone,
            idEstablishment: patients.id_establishment,
            legalRepresentative: patients.legal_representative,
            dniRepLegal: patients.dni_rep_legal,
            nameRepLegal: patients.name_rep_legal,
            lastnameRepLegal: patients.lastname_rep_legal,
            addressRepLegal: patients.address_rep_legal,
            mailRepLegal: patients.mail_rep_legal,
            phoneRepLegal: patients.phone_rep_legal,
            emergencyContact: patients.emergency_contact,
            idCatRelationshipeme: patients.id_cat_relationshipeme,
            nameEmecon: patients.name_emecon,
            lastnameEmecon: patients.lastname_emecon,
            phoneEmecon: patients.phone_emecon,
            addressEmecon: patients.address_emecon,
            idCatGenderEmecon: patients.id_cat_gender_emecon
          };
          this.editPatient(this.countries, this.sltValues);



          this.decrypt(patients.dni, patients.hash);


          this.show();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createPatient = async(namebutton:any) => {
    // this.bloquearbtn(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    
    this.patientsModel.idCatCountry = await JSON.stringify(idLocation);
    const data = {
      process: '', 
      request: 'rgt-patients',
      data: this.patientsModel
    };

    
    console.log('createPatient patientsModel');
    console.log(this.patientsModel);

    //
    await this.patientsService.createPatients(data).subscribe(
      resp => {

        console.log('resp');
        console.log(resp);

        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          location.reload();
           //return window.alert("THE RECORD WAS CORRECTLY KEPT");
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  editPatient = async (countries: any, sltValues:any) => {
    this.switchJsonParse(countries,'0','countries','true');
    this.switchJsonParse(this.gender,'0','gender','true');
    this.switchJsonParse(this.languaje,'0','languaje','true');
    this.switchJsonParse(this.civilstatus,'0','civilstatus','true');
    this.switchJsonParse(this.relations,'0','relations','true');
  }

  decrypt = async (data: any, hash: any) => {
    const dataSet = {
      request: 'decrypt',
      data: {
        data,
        hash
      }
    };
    this.blockchainService.decrypt(dataSet).subscribe(
      resp => {
        if (resp.correct) {
          this.patientsModel.dni = resp.resp.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //procedimiento que obtiene el registro de la tabla a y lo modifica
  updatePatient = async (id:any,namebutton:any) => {
    this.bloquearbtn(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.patientsModel.idCatCountry = await JSON.stringify(idLocation);
    const data = {
      process: '', 
      request: 'upd-patients',
      data: this.patientsModel
    };

    //
    await this.generalService.queryGeneral(data).subscribe(
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
  deletePatient(id:any, namebutton:any): void {
    // aqui bloqueo el boton
    // this.bloquearbtn(namebutton);

    this.generalService.queryGeneral(id).subscribe(
      resp => {
        // const ouput = resp.filter((res: any) => res.ouput === data.request);
        // const answer = ouput[0].answer;
        // if (answer.correct) {
        //   location.reload();
        //   //return window.alert("THE RECORD WAS CORRECTLY KEPT");
        // }
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

  bloquearbtn(namebutton:any): void {
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
              console.log("SI ENTRO EN EL DELEEEEEEEEEE ", id, namebutton);
              this.deletePatient(id, namebutton);
            break;
        }
      }
    });

  }

  // Recorre JSON de Catalogos general.
  switchJsonParse = async (data: [any], traceId: string, name:string, principal:string) => {
    await this.childJson([data], traceId, name, principal);
  }

  childJson = async  (data: [any], strTraceId: string, name:string, principal:string) => {
    const traceIdStr: any = strTraceId.split(',');
    const traceId = traceIdStr.map(this.parseInter);
    const id = traceId[0];
    const record = data[id];
    var colector: any = [];
    var dta: any = [];
    traceId.splice(0, 1);
    if(traceId.length > 0) {
      const strId = traceId.toString();
      await this.childJson(record.children, strId, name, principal);
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
      dta.forEach( async (datachild: any)=> {
        const param: any = datachild.children.find((param: any) => param.name === 'name');
        if (param !== undefined) {
          const idChild = `${datachild.father},${datachild.id}`;
          const value = param.value;
          colector.push({id: idChild, value});          
        }
      });
      if (colector.length > 0) {
        this.colector[name] = colector;
      }
    }
  }

  parseInter(str: any): number {
    return parseInt(str);
  }

}
