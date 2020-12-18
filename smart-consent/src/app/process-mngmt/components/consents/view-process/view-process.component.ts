import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/general/models/process.model';

//SERVICES
import { ProceduresService } from '../../../../general/services/procedures.service';

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.css']
})
export class ViewProcessComponent implements OnInit {
  public process: any;
  public modal: any;
  public processModel: Process;

  constructor(
    private processService: ProceduresService
  ) {
    this.process = [];
    this.getProcess();

    this.processModel = {
      name: null,
      acceptant_text: null,
      rejection_text: null,
      represent_acept_text: null,
      represent_reject_text: null,
      consent_text: null
    };

  }

  ngOnInit(): void {
  }

  getProcess(): void {
    this.processService.getProcess().subscribe(
      resp => {
        if (resp.correct) {
          this.process = resp.resp;
          //console.log(this.process);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createProcess(): void {
    //aqui obtengo los objetos en variables
    const nombre:any=document.getElementById("nombre");
    const txtAcep:any=document.getElementById("texto_acepta");
    const txtRec:any=document.getElementById("texto_rechazo");
    const txtRa:any=document.getElementById("texto_r_acept");
    const txtRr:any=document.getElementById("texto_r_rech");
    const txtCons:any=document.getElementById("texto_consent");

    //aqui asigno las variables al modelo
    this.processModel.name= nombre.value;
    this.processModel.acceptant_text= txtAcep.value;
    this.processModel.rejection_text= txtRec.value;
    this.processModel.represent_acept_text= txtRa.value;
    this.processModel.represent_reject_text= txtRr.value;
    this.processModel.consent_text= txtCons.value;
    //console.log(this.processModel);

    this.processService.createProcess(this.processModel).subscribe(
      response => {
        //console.log("response "+response);
        if (response.correct) {
          // console.info("SE GUARDO CORRECTAMENTE EL REGISTRO: ", response.resp);
          location.reload;
          this.closeModalProcess();
           return window.alert("SE GUARDO CORRECTAMENTE EL REGISTRO");
        }
      },
      error => {
        console.log(error);
      }
    );
    // limpiar formulario
    //return window.alert("SE GUARDO CORRECTAMENTE EL CONSENTIMIENTO, CON SU IDENTIFICADOR: "+this.makeid());

  }

  openModalProcess(): void {
    this.modal = document.getElementById('modalProcess');
    this.modal.style.display = 'block';
  }

  closeModalProcess(): void {
    this.modal = document.getElementById('modalProcess');
    this.modal.style.display = 'none';
  }

}
