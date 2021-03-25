import { Component, ViewChild, HostListener, EventEmitter, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';

//SERVICES
import { StablishmentService } from '../../../service-mngmt/services/stablishment.service';
import { GeneralService } from '../../../service-mngmt/services/general.service';
import { BlockchainService } from '../../../service-mngmt/services/blockchain.service';

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
}

export interface SelectedValues {
  countries: string;
  provinces: string;
  cities: string;
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

  public colector: any;
  public stabListActive: boolean;
  public btnConfirmActive: boolean;
  public countries!: [any];
  public stablishment: any;
  public btnStabActions: any;
  public btn:any;
  public btnclick:any;

  public customers: any;
  public stablishmentmodel!: StablishmentModel;

  //variables para insert de data
  public sltValues!: SelectedValues;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor( 
    private generalService: GeneralService, 
    private stablishmentService: StablishmentService, 
    private blockchainService: BlockchainService, 
    private dialog: MatDialog ) {
      
    this.colector = [];
    this.stabListActive = true;
    this.stablishment = [];
    this.btnConfirmActive = true;
    this.btnStabActions = {
      color: '',
      name: '',
      value: ''
    };
    //proceso que llena el data table y permite filtro y paginacion
    this.dataSource = new MatTableDataSource(this.stablishment);
    this.paginator=ViewChild(MatPaginator);
    this.sort= ViewChild(MatSort);

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
      urlhash: ''
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
    await this.getStablis({ process: '', request: "establishment" });
    await this.getCustomer({ process: '', request: "customers" });
  }

  switchOnClick =async (event: any) => {
    // botones en el datatable
    switch (event.target.id) {
      case 'btnNew':
        this.switchJsonParse(this.countries,'0','countries','true');
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
          urlhash: ''
        };
        this.sltValues = {
          countries: '',
          provinces: '',
          cities: ''
        };

        this.btnStabActions = {
          color: 'primary',
          name: 'Create'
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
          switch (event.target.name) {
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
            const catalog = answer.resp.find((catalog: any) => catalog.description === "countries" );
            this.countries = catalog.data_jb;
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
      process: '', 
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
            cities: stablishment.id_cat_location.cities
          };
          this.stablishmentmodel = {
            idEstablishment: stablishment.id_establishment,
            idCustomer: stablishment.id_customer,
            description: stablishment.description,
            dni: stablishment.dni,
            address: stablishment.address,
            phone: stablishment.phone,
            mail: stablishment.mail,
            idType: stablishment.id_cat_type,
            idLocation: '',
            contactName: stablishment.contact_name,
            contactPhone: stablishment.contact_phone,
            specialistSign:  stablishment.specialist_sign,
            hash: stablishment.hash,
            urlhash: stablishment.urlhash
          };
          this.editEstablishment(this.countries, this.sltValues);
          this.decrypt(stablishment.dni, stablishment.hash);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createStablishment = async(namebutton:any) => {
    this.bloquearbtn(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.stablishmentmodel.idLocation = await JSON.stringify(idLocation);
    const data = {
      process: '', 
      request: 'rgt-establishment',
      data: this.stablishmentmodel
    };
    await this.stablishmentService.createStablishment(data).subscribe(
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

  editEstablishment = async (countries: any, sltValues:any) => {
    await this.switchJsonParse(countries,'0','countries','true');
    await this.switchJsonParse(countries, sltValues.countries, 'provinces', 'false');
    await this.switchJsonParse(countries, sltValues.provinces, 'cities', 'false');
    await this.switchJsonParse(countries, sltValues.cities, '', 'false');
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
          this.stablishmentmodel.dni = resp.resp.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //procedimiento que obtiene el registro de la tabla a y lo modifica
  updateStablishment = async (id:any, namebutton:any) => {
    this.bloquearbtn(namebutton);
    const idLocation = {
      countries: this.sltValues.countries,
      provinces: this.sltValues.provinces,
      cities: this.sltValues.cities
    };
    this.stablishmentmodel.idLocation = await JSON.stringify(idLocation);
    const data = {
      process: '', 
      request: 'upd-establishment',
      data: this.stablishmentmodel
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

   //procedimiento que obtiene el registro de la tabla a y lo modifica
  deleteStablishment = async (id:any, namebutton:any) => {
    this.bloquearbtn(namebutton);
    const data = {
      process: '', 
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
              this.deleteStablishment(id, namebutton);
            break;
        }
      }
    });
  }

  // Recorre JSON de Catalogos general.
  switchJsonParse = async (data: [any], traceId:string, name:string, principal:string) => {
    await this.childJson([data], traceId, name, principal);
  }

  childJson = async (data: [any], strTraceId:string, name:string, principal:string) => {
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