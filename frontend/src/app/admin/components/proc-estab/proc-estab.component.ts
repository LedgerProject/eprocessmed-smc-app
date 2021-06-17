import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/security/services/auth.service';
import { DialogMsgComponent } from '../../../general/components/shared/dialog/dialog-msg/dialog-msg.component';

//SERVICES
import { GeneralService } from '../../../service-mngmt/general.service';

export interface ProcEstab {
  specialties?: any;
  idEstablishment?: string;
  idEstSpec?: string;
  idUserCreate?: number;
  // idUserModify?: string;
}

@Component({
  selector: 'app-proc-estab',
  templateUrl: './proc-estab.component.html',
  styleUrls: ['./proc-estab.component.scss']
})
export class ProcEstabComponent {
  @ViewChild("checkedAll") checkedAll!: ElementRef<any>;

  public dataSesion: any;
  public stablishments: any;
  public procEstabs: any;
  public procEstab!: ProcEstab;
  public step: number;
  public specialties: any;
  public collector: any;
  public slctSpecialty!: string;
  public btnConfirmActive: boolean;
  public specSlctActive: boolean;
  public btnStabActions: any;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    this.switchOnClick(event);
  }

  constructor(private generalService: GeneralService, private authService: AuthService) {
    this.dataSesion = this.authService.getDataSesion();
    this.procEstabs = [];
    this.collector = [];
    this.step = 0;
    this.specialties = [];
    this.btnConfirmActive = true;
    this.specSlctActive = false;

    this.procEstab = {
      specialties: [],
      idEstablishment: '',
      idEstSpec: '',
      idUserCreate: 0
    }

    this.btnStabActions = {
      color: '',
      name: '',
      value: ''
    };

    this.initialAsyncFunctions();
  }

  initialAsyncFunctions = async () => {
    await this.getCatalogs({ request: "catalogs" });
    await this.getStablis({ request: "estab-by-cust", data: { idCustomer: this.dataSesion.customerId } });
    await this.getProcEstabs({ request: "proc-estab" });
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
          await this.editProcEstab(event.target.value);
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
            const specialties = answer.resp.find((catalog: any) => catalog.description === "specialties" );
            this.specialties = specialties.data_jb;
            this.switchJsonParse(this.specialties,'0','specialties','true', '');
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

  getProcEstabs = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.procEstabs = answer.resp;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  presentsSpecialties = async (id_establishment: any, id: any) => {
    const procEstab = this.procEstabs.find((procE: any) => procE.id_establishment === `${id_establishment}`);
    this.specSlctActive = true;
    if (procEstab === undefined) {
      this.btnStabActions = {
        color: 'primary',
        name: 'Create',
        value: id_establishment
      }
      this.createProcEstab(id_establishment);
    } else {
      this.btnStabActions = {
        color: 'accent',
        name: 'Modify',
        value: procEstab.id_est_spec
      };
      this.editProcEstab(id_establishment);
    }
  }

  createProcEstab = async (id: string) => {
    this.procEstab.idUserCreate = parseInt(this.dataSesion.id);
    this.procEstab.idEstablishment = id;
    this.procEstab.specialties = [];
    this.validateCheckedSpecialties(this.procEstab.specialties);
  }

  editProcEstab = async (id: string) => {
    const procEstab = this.procEstabs.find((procE: any) => procE.id_establishment === `${id}`);
    this.procEstab.idEstSpec = procEstab.id_est_spec;
    this.procEstab.specialties = procEstab.specialties;
    this.validateCheckedSpecialties(this.procEstab.specialties);
  }

  validateCheckedSpecialties(specialties: any) {
    this.collector.specialties.forEach((spec: any) => {
      spec.icon = '';
    });
    specialties.forEach((specialtie: any) => {
      const process = specialtie.proc;
      const checkedSpec = this.collector.specialties.find((sp: any) => sp.id === specialtie.specId);
      process.forEach((proc: any) => {
        if (proc.status) {
          checkedSpec.icon = 'done';
        }
      });
    });
  }

  presentsProcedures = async (specialties: any, id: string) => {
    await this.switchJsonParse(specialties, id, 'procedures', 'false', '');
    this.validateProcCheck(id);
  }

  validateProcCheck(id: string) {
    const includeSpc = this.procEstab.specialties.find((ps: any) => ps.specId === id);
    if (includeSpc !== undefined) {

      this.collector.procedures.forEach( async (prc: any) => {
        prc['checked'] = false;
        const includeProc = includeSpc.proc.find((sp: any) => sp.id === prc.id);

        if (includeProc !== undefined) {
          if (includeProc.status === 1) {
            prc.checked = true;
          }
        }

      });
    }
    this.setStep(1);
  }

  addRemoveProcAll = async (slctSpecialty: string, event: any) => {
    const checkedAll: any = this.checkedAll;
    const procedures: any = this.collector.procedures;
    let statusAll: number;
    if (!checkedAll.checked) {
      statusAll = 1;
    } else {
      statusAll = 0;
    }
    await this.switchJsonParse(this.specialties, slctSpecialty, 'procedures','false', '');
    await procedures.forEach((procedure: any) => {
      this.addRemoveProcedure(slctSpecialty,procedure.id,true,statusAll);
    });
  }

  addRemoveProcedure = async (slctSpecialty: string, id: string, all: boolean, statusAll: number) => {
    let status;
    const includeSpc = this.procEstab.specialties.find((spec: any) => spec.specId === slctSpecialty);
    if (all) {
      status = statusAll;
    } else {
      status = 1;
    }
    if (includeSpc === undefined) {
      this.procEstab.specialties.push({specId: ``+slctSpecialty+``, proc: [{id: ``+id+``, status}]});
    } else {
      const includeProc = includeSpc.proc.find((proc: any) => proc.id ===  ``+id+``);
      if (includeProc === undefined) {
        await includeSpc.proc.push({id: ``+id+``, status});
      } else {
        if (all) {
          includeProc.status = status;
        } else {
          if (includeProc.status === 0) {
            includeProc.status = 1;
          } else {
            includeProc.status = 0;
          }
        }
      }
    }
    this.validateProcCheck(slctSpecialty);
  }

  saveProcEstabs = async (btn: any, action: string, id: string) => {
    let request;
    switch (action) {
      case 'Create':
          request = "rgt-proc-estab";
        break;
      case 'Modify':
          request = "upd-proc-estab";
        break;    
    }
    if (this.procEstab.idEstablishment !== '' && this.procEstab.specialties.length > 0) {
      this.lockButton(btn);
      this.procEstab.specialties = await JSON.stringify(this.procEstab.specialties);
      const data = {
        request,
        data: this.procEstab
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
      console.log('Error: Los Establishment y Specialties son obligatorios');
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
        let videos = [];

        if (name === 'procedures') {
          const paramsGroups: any = datachild.children.find((param: any) => param.name === 'video');

          for (let i = 0; i < paramsGroups.children.length; i++) {
            const element = paramsGroups.children[i];
            let video: any = {};

            for (let j = 0; j < element.children.length; j++) {
              const elmt = element.children[j];
              video[`${elmt.name}`] = elmt.value;
            }

            videos.push(video);

          }
        }

        const param: any = datachild.children.find((param: any) => param.name === paramName);
        if (param !== undefined) {
          const idChild = `${datachild.father},${datachild.id}`;
          const value = param.value;

          if (name === 'procedures') {
            collector.push({id: idChild, value, videos});
          } else {
            collector.push({id: idChild, value}); 
          }

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
