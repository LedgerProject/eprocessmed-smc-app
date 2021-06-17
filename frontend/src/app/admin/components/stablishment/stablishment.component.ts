import { Component, ViewChild, HostListener, EventEmitter, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';

//SERVICES
import { StablishmentService } from '../../../service-mngmt/stablishment.service';
import { GeneralService } from '../../../service-mngmt/general.service';
import { BlockchainService } from '../../../service-mngmt/blockchain.service';
import { AuthService } from 'src/app/security/services/auth.service';

export interface StablishmentModel {
  idEstablishment?: string;
  idCustomer?: string;
  description?: string;
  dni?: string;
  address?: string;
  phone?: string;
  mail?: string;
  idType?: string;
  idLocation?: any;
  contactName?: string;
  contactPhone?: string;
  specialistSign?: string;
  hash?: string;
  urlhash?: string;
  patientLoad?: string;
  idCatPatientLoad?: string;
  idCatPatientVal?: string;
}

export interface SelectedValues {
  countries: string;
  provinces: string;
  cities: string;
  idType: string;
  idCatPatientLoad: string;
  idCatPatientVal: string;
}

@Component({
  selector: 'app-stablishment',
  templateUrl: './stablishment.component.html',
  styleUrls: ['./stablishment.component.scss']
})

export class StablishmentComponent implements AfterViewInit {
  displayedColumns: string[] = ['action','idestablishment', 'name', 'dni', 'address', 'mail', 'phone'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSesion: any;
  public collector: any;
  public stabListActive: boolean;
  public btnConfirmActive: boolean;
  public countries!: [any];
  public dataUploadPat!: [any];
  public patientDtValProc!: [any];
  public stablishment: any;
  public btnStabActions: any;
  public btn:any;
  public btnclick:any;
  public customers: any;
  public stablishmentmodel!: StablishmentModel;

  // variables para insert de data
  public sltValues!: SelectedValues;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor (
    private generalService: GeneralService, 
    private stablishmentService: StablishmentService, 
    private blockchainService: BlockchainService, 
    private dialog: MatDialog,
    private authService: AuthService) {
    this.dataSesion = this.authService.getDataSesion();
    this.collector = [];
    this.stabListActive = true;
    this.stablishment = [];
    this.btnConfirmActive = true;
    this.btnStabActions = {
      color: '',
      name: '',
      value: ''
    };

    // proceso que llena el data table y permite filtro y paginacion
    this.dataSource = new MatTableDataSource(this.stablishment);
    this.paginator = ViewChild(MatPaginator);
    this.sort = ViewChild(MatSort);

    this.stablishmentmodel = {
      idEstablishment:'',
      idCustomer:'',
      description:'',
      dni:'',
      address:'',
      phone:'',
      mail:'',
      idType:'',
      idLocation:'',
      contactName:'',
      contactPhone:'',
      specialistSign: '',
      hash: '',
      urlhash: '',
      patientLoad: '',
      idCatPatientLoad: '',
      idCatPatientVal: ''
    };
    
    this.sltValues = {
      countries: '',
      provinces: '',
      cities: '',
      idType: '',
      idCatPatientLoad: '',
      idCatPatientVal: ''
    };

    this.initialAsyncFunctions();
  }

  ngAfterViewInit = async () =>{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initialAsyncFunctions = async () => {
    await this.getCatalogs({ request: "catalogs" });
    await this.getStablis({ request: "estab-by-cust", data: { idCustomer: this.dataSesion.customerId } });
    await this.getCustomer({ request: "customers" });
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
        this.stablishmentmodel = {
          idEstablishment:'',
          idCustomer: this.dataSesion.customerId,
          description:'',
          dni:'',
          address:'',
          phone:'',
          mail:'',
          idType:'',
          idLocation:'',
          contactName:'',
          contactPhone:'',
          specialistSign: '',
          hash: '',
          urlhash: '',
          patientLoad: '',
          idCatPatientLoad: '',
          idCatPatientVal: ''
        };
        this.sltValues = {
          countries: '',
          provinces: '',
          cities: '',
          idType: '',
          idCatPatientLoad: '',
          idCatPatientVal: ''
        };
        this.btnStabActions = {
          color: 'primary',
          name: 'Create',
          value: ''
        }
        this.show();
      break;
      case 'btnModify':
          await this.getStablishmentByid(event.target.value);
          this.btnStabActions = {
            color: 'accent',
            name: 'Modify',
            value: event.target.value
          };
          this.show();
        break;
      case 'btnDelete':
          this.getStablishmentByid(event.target.value);
          this.btnStabActions = {
            color: 'accent',
            name: 'Delete',
            value: event.target.value
          }
          this.show();
        break;
      case 'btnConfirm': // botones en el CONTENT REGISTER, UPDATE, DELETE
          switch (eventTargetName) {
            case 'Create':
                this.createStablishment(event.target.id);
              break;
            case 'Modify':
                this.updateStablishment(event.target.value, event.target.id);
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
            const dataUploadPat = answer.resp.find((catalog: any) => catalog.description === "dataUploadPat" );
            const patientDtValProc = answer.resp.find((catalog: any) => catalog.description === "patientDtValProc" );
            this.countries = countries.data_jb;
            this.dataUploadPat = dataUploadPat.data_jb;
            this.patientDtValProc = patientDtValProc.data_jb;
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

  getStablis = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.stablishment = answer.resp;
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.stablishment);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getStablishmentByid(id:any): void {
    const dataSet = {
      request: 'estab-by-id',
      data: {idEstablishment: id}
    };
    this.generalService.queryGeneral(dataSet).subscribe(
      resp => {
        const estabById = resp.find((dta: any) => dta.ouput === 'estab-by-id');
        const answer = estabById.answer;
        if (answer.correct) {
          const stablishment = answer.resp[0];
          this.sltValues = {
            countries: stablishment.id_cat_location.countries,
            provinces: stablishment.id_cat_location.provinces,
            cities: stablishment.id_cat_location.cities,
            idType: stablishment.id_cat_type.idType,
            idCatPatientLoad: stablishment.id_cat_patient_load.idCatPatientLoad,
            idCatPatientVal: stablishment.id_cat_patient_val.idCatPatientVal
          };
          this.stablishmentmodel = {
            idEstablishment: stablishment.id_establishment,
            idCustomer: stablishment.id_customer,
            description: stablishment.description,
            dni: stablishment.dni,
            address: stablishment.address,
            phone: stablishment.phone,
            mail: stablishment.mail,
            idType: '',
            idLocation: '',
            contactName: stablishment.contact_name,
            contactPhone: stablishment.contact_phone,
            specialistSign:  stablishment.specialist_sign,
            hash: stablishment.hash,
            urlhash: stablishment.url_hash,
            patientLoad: stablishment.patient_load,
            idCatPatientLoad: '',
            idCatPatientVal: ''
          };
          this.editEstablishment(this.countries, this.sltValues);
          let encrypted = {
            dni: stablishment.dni,
            address: stablishment.address,
            mail: stablishment.mail,
            phone: stablishment.phone,
            contactName: stablishment.contact_name,
            contactPhone: stablishment.contact_name     
          };
          this.decrypt(encrypted, stablishment.hash);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async selectBuilder(){
    await this.switchJsonParse(this.countries,'0','countries','true', '');
    await this.switchJsonParse(this.dataUploadPat,'0','dataUploadPat','true', '');
    await this.switchJsonParse(this.patientDtValProc,'0','patientDtValProc','true', ''); 
  }

  createStablishment = async(namebutton:any) => {
    this.lockButton(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.stablishmentmodel.idLocation = await JSON.stringify(idLocation);
    this.stablishmentmodel.idType = await JSON.stringify({idType: this.sltValues.idType});
    this.stablishmentmodel.idCatPatientLoad = await JSON.stringify({idCatPatientLoad: this.sltValues.idCatPatientLoad});
    this.stablishmentmodel.idCatPatientVal = await JSON.stringify({idCatPatientVal: this.sltValues.idCatPatientVal});
    const data = {
      request: 'rgt-establishment',
      data: this.stablishmentmodel
    };
    await this.stablishmentService.crtUpdStablishment(data).subscribe(
      resp => {
        const ouput = resp.resp.filter((res: any) => res.ouput === 'upd-ncrypt-establ');
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

  editEstablishment = async (countries: any, sltValues:any) => {
    await this.switchJsonParse(countries, sltValues.countries, 'provinces', 'false', '');
    await this.switchJsonParse(countries, sltValues.provinces, 'cities', 'false', '');
    await this.switchJsonParse(countries, sltValues.cities, '', 'false', '');
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
          const decryptSData = resp.resp.data;
          this.stablishmentmodel.dni = decryptSData.dni,
          this.stablishmentmodel.address = decryptSData.address,
          this.stablishmentmodel.mail = decryptSData.mail,
          this.stablishmentmodel.phone = decryptSData.phone,
          this.stablishmentmodel.contactName = decryptSData.contactName,
          this.stablishmentmodel.contactPhone = decryptSData.contactName
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //procedimiento que obtiene el registro de la tabla a y lo modifica
  updateStablishment = async (id:any, namebutton:any) => {
    this.lockButton(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.stablishmentmodel.idLocation = await JSON.stringify(idLocation);
    this.stablishmentmodel.idType = await JSON.stringify({idType: this.sltValues.idType});
    this.stablishmentmodel.idCatPatientLoad = await JSON.stringify({idCatPatientLoad: this.sltValues.idCatPatientLoad});
    this.stablishmentmodel.idCatPatientVal = await JSON.stringify({idCatPatientVal: this.sltValues.idCatPatientVal});
    const data = {
      request: 'upd-establishment',
      data: this.stablishmentmodel
    };
    await this.stablishmentService.crtUpdStablishment(data).subscribe(
      resp => {
        const ouput = resp.resp.filter((res: any) => res.ouput === data.request);
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

   //procedimiento que obtiene el registro de la tabla a y lo modifica
  deleteStablishment = async (id:any, namebutton:any) => {
    this.lockButton(namebutton);
    const data = {
      request: 'upd-establishment',
      data: {
        idEstablishment: id,
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
    if (this.stabListActive) {
      this.stabListActive = false;
      this.btnConfirmActive = true;
    } else {
      this.stabListActive = true;
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
        action: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'delete':
              this.deleteStablishment(id, namebutton);
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

      // Separar y parametrizar solo para construir selectores
      dta.forEach( async (datachild: any)=> {
        const param: any = datachild.children.find((param: any) => param.name === paramName);
        if (param !== undefined) {
          const idChild = `${datachild.father},${datachild.id}`;
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
