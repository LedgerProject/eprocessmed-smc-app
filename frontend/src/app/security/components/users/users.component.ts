import { Component, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';
import { UsrStrucDialogComponent } from '../../../general/components/shared/dialog/usr-struc-dialog/usr-struc-dialog.component';

// SERVICES
import { UsersService } from '../../../service-mngmt/users.service';
import { GeneralService } from '../../../service-mngmt/general.service';
import { BlockchainService } from '../../../service-mngmt/blockchain.service';
import { AuthService } from '../../services/auth.service';

export interface UserModel {
  idUser?: string;
  dni?: string;
  name?: string;
  lastname?: string;
  login?: string;
  password?: string;
  mail?: string;
  codePhone?: string;
  phone?: string;
  idGoogle?: string;
  idHashAlastria?: string;
  idCatRoluser?: string;
  userStructure?: string;
  idCatAccesstype?: string;
  idEstablishment?: string;
  // creation_date?: string;
  // modification_date?: string;
  idUserCreate?: number;
  idUserModify?: number;
  // status?: string;
}

export interface SelectedValues {
  idCatAccesstype?: string;
  idCatRoluser?: string;
  userStructure?: any;
  codePhone?: string;
}

export interface Encrypted {
  dni?: string;
  name?: string;
  lastname?: string;
  login?: string;
  password?: string;
  mail?: string;
  phone?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = [
    'action',
    'id_user',
    'dni',
    'name',
    'lastname',
    'login',
    // 'password',
    'mail',
    'code_phone',
    'phone',
    // 'id_google',
    // 'id_hash_alastria',
    // 'id_cat_roluser',
    // 'user_structure',
    // 'id_cat_accesstype',
    'id_establishment',
    // 'creation_date',
    // 'modification_date',
    // 'id_user_create',
    // 'id_user_modify',
    // 'status'
  ];
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSesion: any;
  public collector: any;
  public usersListActive: boolean;
  public btnConfirmActive: boolean;
  public countries!: [any];
  public roles!: [any];
  public additionalData!: [any];
  public users: any;
  public btnUsersActions: any;
  public btn:any;
  public btnclick:any;
  public readonlyEdit!: boolean;
  public stablishment: any;
  public userModel!: UserModel;
  public sltValues!: SelectedValues;
  public encrypted!: Encrypted;
  public countryPhoneCodes: any;
  
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  @HostListener('change', ['$event'])
  onChange(event: any): void {
    if (event.target.className.includes('usrStruc')) {
      this.saveUsrStruc(event.target.name, event.target.value);
    }
  }

  constructor(
    private generalService: GeneralService, 
    private authService: AuthService,
    private usersService: UsersService, 
    private blockchainService: BlockchainService, 
    private dialog: MatDialog ) {
    this.dataSesion = this.authService.getDataSesion();
    this.stablishment = [];
    this.collector = [];
    this.usersListActive = true;
    this.users = [];
    this.countryPhoneCodes = [];
    this.btnConfirmActive = true;
    this.btnUsersActions = {
      color: '',
      name: '',
      value: ''
    };
    //proceso que llena el data table y permite filtro y paginacion
    this.dataSource = new MatTableDataSource(this.users);
    this.paginator=ViewChild(MatPaginator);
    this.sort= ViewChild(MatSort);
    this.initialAsyncFunctions();
  }

  ngAfterViewInit = async () =>{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  switchOnClick = async (event: any) => {
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
        this.btnUsersActions = {
          color: 'primary',
          name: 'Create',
          value: ''
        }
        this.show();
      break;
      case 'btnModify':
          await this.getUserByid(event.target.value);
          this.btnUsersActions = {
            color: 'accent',
            name: 'Modify',
            value: event.target.value
          };
        break;
      case 'btnDelete':
          this.getUserByid(event.target.value);
          this.btnUsersActions = {
            color: 'accent',
            name: 'Delete',
            value: event.target.value
          }
          // this.show();
        break;
      case 'btnConfirm':
          switch (eventTargetName) {
            case 'Create':
                this.createUser(event.target.id);
              break;
            case 'Modify':
                this.updateUser(event.target.value, event.target.id);
              break;
            case 'Delete':
                this.openDialog(event.target.value, event.target.id);
              break;
          }
        break;        
    }
  }

  initialAsyncFunctions = async () => {
    await this.initialCollectors();
    await this.getCatalogs({ request: "catalogs" });
    await this.getUsers({ request: "usr-by-estab", data: { idEstablishment: this.parseInter(this.dataSesion.idEstablishment) } });
    await this.getStablis({ request: "estab-by-cust", data: { idCustomer: this.dataSesion.customerId } });
  }

  initialCollectors = async () => {
    this.readonlyEdit = false;
    this.sltValues = {
      idCatAccesstype: '',
      idCatRoluser: '',
      userStructure: [],
      codePhone: ''
    }
    this.userModel = {
      idUser: '',
      dni: '',
      name: '',
      lastname: '',
      login: '',
      password: '',
      mail: '',
      codePhone: '',
      phone: '',
      idGoogle: '',
      idHashAlastria: '',
      idCatRoluser: '',
      userStructure: '',
      idCatAccesstype: '',
      idEstablishment: '',
      idUserCreate: 0
    };
  }

  getCatalogs = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            const countries = answer.resp.find((catalog: any) => catalog.description === "countries" );
            const additionalData = answer.resp.find((catalog: any) => catalog.description === "additional_data" );
            const roles = answer.resp.find((catalog: any) => catalog.description === "roles" );
            this.countries = countries.data_jb;
            this.additionalData = additionalData.data_jb;
            this.roles = roles.data_jb;
            this.selectBuilder();
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

  getUsers = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.users = answer.resp;
            this.dataSource = new MatTableDataSource(this.users);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getUserByid(id:any): void {
    const dataSet = {
      request: 'usr-by-id',
      data: { idUser: id }
    };  
    this.generalService.queryGeneral(dataSet).subscribe(
      resp => {
        const usrById = resp.find((dta: any) => dta.ouput === dataSet.request);
        const answer = usrById.answer;
        if (answer.correct) {
          const user = answer.resp[0];
          this.sltValues = {
            idCatAccesstype: user.id_cat_accesstype.idCatAccesstype,
            idCatRoluser: user.id_cat_roluser.idCatRoluser,
            userStructure: user.user_structure.userStructure,
            codePhone: user.code_phone.codePhone
          };
          this.userModel = {
            idUser: user.id_user,
            dni: user.dni,
            name: user.name,
            lastname: user.lastname,
            login: user.login,
            password: user.password_user,
            mail: user.mail,
            codePhone: '',
            phone: user.phone,
            idGoogle: user.id_google,
            idHashAlastria: user.id_hash_alastria,
            idCatRoluser: '',
            userStructure: '',
            idCatAccesstype: '',
            idEstablishment: user.id_establishment
          };
          let encrypted = {
            dni: user.dni,
            name: user.name,
            lastname: user.lastname,
            login: user.login,
            mail: user.mail,
            phone: user.phone
          }
          this.decrypt(encrypted, user.id_establishment);
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
    await this.switchJsonParse(this.countries,'0','countries','true', '');
    await this.switchJsonParse(this.additionalData,'0','additional_data','true', '');
    await this.switchJsonParse(this.roles,'0','roles','true', '');
    await this.phoneCodeBuilder(this.collector.countries);
  }

  phoneCodeBuilder(countries: any) {
    countries.forEach((country: any) => {
      const data = country.data;
      const codeData = data.find((dta: any) => dta.name === 'code');
      const nameDats = data.find((dta: any) => dta.name === 'name');
      const id = codeData.id;
      const value = nameDats.value;
      this.countryPhoneCodes.push({id, value});
    });
  }

  createUser = async (namebutton: any) => {
    this.lockButton(namebutton);
    this.userModel.codePhone = await JSON.stringify({codePhone: this.sltValues.codePhone});
    this.userModel.idCatAccesstype = await JSON.stringify({idCatAccesstype: this.sltValues.idCatAccesstype});
    this.userModel.idCatRoluser = await JSON.stringify({idCatRoluser: this.sltValues.idCatRoluser});
    this.userModel.userStructure = await JSON.stringify({userStructure: this.sltValues.userStructure});
    this.userModel.idUserCreate = parseInt(this.dataSesion.id);
    const data = {
      request: 'rgt-users',
      module: 'admin',
      data: this.userModel
    };
    await this.usersService.crtUpdUser(data).subscribe(
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
  updateUser = async (id: any, namebutton: any) => {
    this.lockButton(namebutton);
    this.userModel.codePhone = await JSON.stringify({codePhone: this.sltValues.codePhone});
    this.userModel.idCatAccesstype = await JSON.stringify({idCatAccesstype: this.sltValues.idCatAccesstype});
    this.userModel.idCatRoluser = await JSON.stringify({idCatRoluser: this.sltValues.idCatRoluser});
    this.userModel.userStructure = await JSON.stringify({userStructure: this.sltValues.userStructure});
    const data = {
      request: 'upd-users',
      data: this.userModel
    };
    await this.usersService.crtUpdUser(data).subscribe(
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
  deletePatient = async (id:any, namebutton:any) => {
    this.lockButton(namebutton);
    const data = {
      request: 'upd-users',
      data: {
        idUser: id,
        status: '0'
      }
    };
    await this.generalService.queryGeneral(data).subscribe(
      resp => {
        const usrDelete = resp.find((dta: any) => dta.ouput === data.request);
        const answer = usrDelete.answer;
        if (answer.correct) {
          location.reload(); //return window.alert("THE RECORD WAS CORRECTLY KEPT");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
  decrypt = async (data: any, idEstablishment: any) => {
    await this.authService.getHash().subscribe(
      resp => {
        if (resp.correct) {
          const hash = resp.resp;
          const dataSet = {
            request: 'decrypt',
            data: { data, hash }
          };
          this.blockchainService.decrypt(dataSet).subscribe(
            resp => {
              if (resp.correct) {
                const respData: any = resp.resp.data;
                this.userModel.dni = respData.dni;
                this.userModel.name = respData.name;
                this.userModel.lastname = respData.lastname;
                this.userModel.login = respData.login;
                this.userModel.mail = respData.mail;
                this.userModel.phone = respData.phone;
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

  // Modal para crear Datos Adicionales
  dialogCreateUsrStrcu(typeDlg: string): void {
    let titleDlg = '';
    const additionalDatas: any[] = this.collector.additional_data;
    switch (typeDlg) {
      case 'create':
          titleDlg = 'New Additional Data';
        break;
      case 'edit':
          titleDlg = 'Edit Additional Data';
        break;
    }
    const dialogRef = this.dialog.open(UsrStrucDialogComponent, {
      width: '250px',
      data: {
        titleDlg,
        action: '',
        additionalDatas,
        addtData: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'create':
            this.createUserStrct(result);
            break;
        case 'edit':// dalete
            this.editUserStruc(result);
          break;
        }
      }
    });
  }

  createUserStrct(result: any) {
    const idData = result.addtData.split('|');
    const idFather = idData[0];
    const id = idData[1];
    const father = result.additionalDatas.find((dta: any) => dta.id === idFather);
    const slectData = father.data.find((dta: any) => dta.id === id);
    const addtData = {name: slectData.value, value: ''};
    const struc = this.sltValues.userStructure.find((dta: any) => dta.name === slectData.value);
    if (struc === undefined) {
      this.sltValues.userStructure.push(addtData);
    }
  }

  editUserStruc(result: any) {
    const idData = result.addtData.split('|');
    const idFather = idData[0];
    const id = idData[1];
    const father = result.additionalDatas.find((dta: any) => dta.id === idFather);
    const slectData = father.data.find((dta: any) => dta.id === id);
    const editData = {name: slectData.value, value: ''};
    const struc = this.sltValues.userStructure.find((dta: any) => dta.name === slectData.value);
  }

  saveUsrStruc(name: string, value: string): void {
    let params = this.sltValues.userStructure.find((struc: any) => struc.name === name);
    params.value = value;
  }

  // Modal para crear eliminar registro
  openDialog(id:any, namebutton:any): void {
    var titleDlg = 'Do you want to delete this record?';
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
    if (this.usersListActive) {
      this.usersListActive = false;
      this.btnConfirmActive = true;
    } else {
      this.usersListActive = true;
    }
  }

  lockButton(namebutton:any): void {
    switch (namebutton) {
      case 'btnConfirm':
          this.btnConfirmActive = false;
        break;
    }
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
    if (traceId.length > 0) {
      const strId = traceId.toString();
      await this.childJson(record.children, strId, name, principal, paramName);
    } else {
      if(principal == 'true') {
        dta= record.children;
      } else {
        if (name !== '') {
          const dtaChid = record.children.find((param: any) => param.name === name);   
          if (dtaChid.children !== undefined) {
            dta = dtaChid.children;
          }          
        }
      }
      // Separar y parametrizar solo para construir selectores
      dta.forEach( async (datachild: any) => {
        const idChild = `${datachild.father},${datachild.id}`;
        let params: any = {};
        let data: any = [];
        params[`id`] = idChild;
        datachild.children.forEach((element: any, index: any) => {
          data.push({ id: `${idChild},${index}`, name: element.name, value: element.value });
        });
        params['data'] = data;
        collector.push(params);
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