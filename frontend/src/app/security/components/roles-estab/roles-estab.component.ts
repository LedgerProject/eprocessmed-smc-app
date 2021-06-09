import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

//SERVICES
import { GeneralService } from '../../../service-mngmt/general.service';

export interface RolEstab {
  roles?: any,
  modules?: any;
  idEstablishment?: string;
  idRol?: string;
  idCatRoluser?: string;
}

@Component({
  selector: 'app-roles-estab',
  templateUrl: './roles-estab.component.html',
  styleUrls: ['./roles-estab.component.scss']
})
export class RolesEstabComponent {
  @ViewChild("checkedAll") checkedAll!: ElementRef<any>;
  public stablishments: any;
  public rolEstabs: any;
  public rolEstab!: RolEstab;
  public step: number;
  public modules: any;
  public roles: any;
  public collector: any;
  public slctModule!: string;
  public btnConfirmActive: boolean;
  public slctRolActive: boolean;
  public slctModActive: boolean;
  public btnRolStabActions: any;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor(private generalService: GeneralService) {
    this.rolEstabs = [];
    this.collector = [];
    this.step = 0;
    this.modules = [];
    this.roles = [];
    this.btnConfirmActive = true;
    this.slctRolActive = false;
    this.slctModActive = false;

    this.rolEstab = {
      roles: [],
      modules: [],
      idEstablishment: '',
      idRol: '',
      idCatRoluser: ''
    }

    this.btnRolStabActions = {
      color: '',
      name: '',
      value: ''
    };

    this.initialAsyncFunctions();
  }

  initialAsyncFunctions = async () => {
    await this.getCatalogs({ request: "catalogs" });
    await this.getStablis({ request: "establishment" });
    await this.getRolesEstabs({ request: "rol-estab" });
    this.activateStep();
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
      case 'btnModify':
          await this.editRolesEstab(event.target.value);
          this.setStep(0);
        break;
      case 'btnConfirm':
          switch (eventTargetName) {
            case 'Create':
                this.saveProcEstabs(event.target.id, 'Create', event.target.value);
              break;            
            case 'Modify':
                this.saveProcEstabs(event.target.id, 'Modify', event.target.value);
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
            const modules = answer.resp.find((catalog: any) => catalog.description === "modules");
            const roles = answer.resp.find((catalog: any) => catalog.description === "roles");
            this.modules = modules.data_jb;
            this.roles = roles.data_jb;
            this.switchJsonParse(this.modules,'0','modules','true', '');
            this.switchJsonParse(this.roles,'0','roles','true', '');
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
            this.stablishments = answer.resp;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getRolesEstabs = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.rolEstabs = answer.resp;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  presentsRoles = async (id_establishment: any) => {
    this.rolEstab.idEstablishment = id_establishment;
    this.rolEstab.roles = [];
    this.rolEstab.idCatRoluser = '';
    this.slctModActive = false;
    const rolEstab = this.rolEstabs.find((rolE: any) => rolE.id_establishment === `${id_establishment}`);
    if (rolEstab !== undefined) {
      const rolEstab = this.rolEstabs.filter((rolE: any) => rolE.id_establishment === `${id_establishment}`);
      this.rolEstab.roles = rolEstab;
    }
     this.slctRolActive = true;
    this.validateCheckedRoles(this.rolEstab.roles);
  }

  editRolesEstab = async (id: string) => {
    const rolEstab = this.rolEstabs.filter((rolE: any) => rolE.id_establishment === `${id}`);
    this.rolEstab.roles = rolEstab;
    this.slctRolActive = true;
    this.validateCheckedRoles(this.rolEstab.roles);
  }

  validateCheckedRoles(estabRoles: any) {
    this.collector.roles.forEach((rol: any) => {
      rol.icon = '';
    });
    estabRoles.forEach((rol: any) => {
      const rolId = rol.id_cat_roluser.idCatRoluser;
      const checkedRoles = this.collector.roles.find((rl: any) => rl.id === rolId);
      if (checkedRoles !== undefined) {
        checkedRoles.icon = 'done';
      }
    });
  }

  roleModules = async (idCatRoluser: string) => {
    this.rolEstab.idCatRoluser = idCatRoluser;
    this.rolEstab.idRol = '';
    this.rolEstab.modules = [];
    this.slctModActive = true;
    const roles = this.rolEstab.roles;
    const selectedRole = roles.find((rol: any) => rol.id_cat_roluser.idCatRoluser === idCatRoluser);
    if (selectedRole !== undefined) {
      this.rolEstab.modules = selectedRole.modules;
      this.rolEstab.idRol = selectedRole.id_rol;
      this.btnRolStabActions = {
        color: 'accent',
        name: 'Modify',
        value: selectedRole.id_rol
      };
    } else {
      this.btnRolStabActions = {
        color: 'primary',
        name: 'Create',
        value: ''
      }
    }
    this.validateCheckedModules(this.rolEstab.modules);
  }

  validateCheckedModules(estabModules: any) {
    this.collector.modules.forEach((spec: any) => {
      spec.icon = '';
    });
    estabModules.forEach((module: any) => {
      const subModule = module.subMd;
      const checkedModule = this.collector.modules.find((md: any) => md.id === module.modId);
      subModule.forEach((subMd: any) => {
        if (subMd.status) {
          checkedModule.icon = 'done';
        }
      });
    });
  }

  presentsSubModules = async (modules: any, id: string) => {
    // this.checkedAll.checked = false;
    await this.switchJsonParse(modules, id, 'submodules', 'false', '');
    this.validateSubMdCheck(id);
  }

  validateSubMdCheck(id: string) {
    const includeMdl = this.rolEstab.modules.find((ps: any) => ps.modId === id);
    if (includeMdl !== undefined) {
      this.collector.submodules.forEach((subMd: any) => {
        subMd['checked'] = false;
        const includeProc = includeMdl.subMd.find((md: any) => md.id === subMd.id);
        if (includeProc !== undefined) {
          if (includeProc.status === 1) {
            subMd.checked = true;
          }
        }
      });
    }
    this.setStep(1);
  }

  addRemoveProcAll = async (slctModule: string, event: any) => {
    const checkedAll: any = this.checkedAll;
    const submodules: any = this.collector.submodules;
    let statusAll: number;
    if (!checkedAll.checked) {
      statusAll = 1;
    } else {
      statusAll = 0;
    }
    await this.switchJsonParse(this.modules,slctModule,'submodules','false', '');
    await submodules.forEach((submodule: any) => {
      this.addRemoveProcedure(slctModule,submodule.id,true,statusAll);
    });
  }

  addRemoveProcedure = async (slctModule: string, id: string, all: boolean, statusAll: number) => {
    let status;
    const includeMdl = this.rolEstab.modules.find((mdl: any) => mdl.modId === slctModule);
    if (all) {
      status = statusAll;
    } else {
      status = 1;
    }
    if (includeMdl === undefined) {
      this.rolEstab.modules.push({modId: ``+slctModule+``, subMd: [{id: ``+id+``, status}]});
    } else {
      const includeSubMd = includeMdl.subMd.find((subMd: any) => subMd.id ===  ``+id+``);
      if (includeSubMd === undefined) {
        await includeMdl.subMd.push({id: ``+id+``, status});
      } else {
        if (all) {
          includeSubMd.status = status;
        } else {
          if (includeSubMd.status === 0) {
            includeSubMd.status = 1;
          } else {
            includeSubMd.status = 0;
          }
        }
      }
    }
    this.validateSubMdCheck(slctModule);
  }

  saveProcEstabs = async (btn: any, action: string, id: string) => {
    let request;
    switch (action) {
      case 'Create':
          request = "rgt-rol-estab";
        break;
      case 'Modify':
          request = "upd-rol-estab";
        break;    
    }
    if (this.rolEstab.idEstablishment !== '' && this.rolEstab.modules.length > 0) {
      this.lockButton(btn);
      this.rolEstab.modules = await JSON.stringify(this.rolEstab.modules);
      this.rolEstab.idCatRoluser = await JSON.stringify({idCatRoluser: this.rolEstab.idCatRoluser});
      const data = {
        request,
        data: {
          idEstablishment: this.rolEstab.idEstablishment,
          idRol: this.rolEstab.idRol,
          idCatRoluser: this.rolEstab.idCatRoluser,
          modules: this.rolEstab.modules
        }
      };
      await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            location.reload();
          } else {
            this.activateButton('btnConfirm');
          }
        },
        error => {
          console.log(error);
        }
      );

    } else {
      console.log('Error: Los Establishment y modules son obligatorios');
    }
  }

  setStep(index: number) {
    this.step = index;
    this.activateStep();
  }

  nextStep() {
    this.step++;
    this.activateStep();
  }

  prevStep() {
    this.step--;
    this.activateStep();
  }

  activateStep(): void {
    const step = this.step+2;
    const expPanelHeader: any = document.getElementsByClassName('expansion-panel-header');
    const activeStep: any = document.getElementById(`mat-expansion-panel-header-${step}`);
    const len = expPanelHeader.length;
    for (var i = 0; i < len; i++) {
      expPanelHeader[i].classList.remove("activeStep");
    }
    activeStep.classList.add("activeStep");
  }

  lockButton(namebutton:string): void {
    switch (namebutton) {
      case 'btnConfirm':
          this.btnConfirmActive = false;
        break;
    }
  }

  activateButton(namebutton:string): void {
    switch (namebutton) {
      case 'btnConfirm':
          this.btnConfirmActive = true;
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
          // const idChild = `${datachild.father},${param.id}`;
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
