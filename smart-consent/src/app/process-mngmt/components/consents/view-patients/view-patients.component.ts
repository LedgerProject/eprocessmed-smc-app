import { Component, OnInit } from '@angular/core';

/* Services */
import { PatientsService } from '../../../../general/services/patients.service';
import { Patient } from 'src/app/general/models/patient.model';


@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewpatientsComponent implements OnInit {
  public patients:any;
  public patientModel: Patient;
  public modal: any;

  constructor(
    private patientsService: PatientsService
    ) {

    this.patients= [];
    this.getPatients();

    this.patientModel = {
       no_historia_c: null,
       dni: null,
       name: null,
       lastname: null,
       gender: null,
       language: null,
       birthdate:null,
       civilstatus:null,
       address:null,
       mail:null,
       country:null,
       phone:null
    };

    }


  ngOnInit(): void {
  }



  getPatients(): void {
    this.patientsService.getPatients().subscribe(
      resp => {
        if (resp.correct) {
          this.patients = resp.resp;
          console.log(this.patients);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createPatient(): void{
    //aqui obtengo los objetos en variables
    const dni:any=document.getElementById("dni");
    const nombre:any=document.getElementById("nombre");
    const apellido:any=document.getElementById("apellido");
    const no_historia:any=document.getElementById("no_historia");
    const fecha_n:any=document.getElementById("fecha_n");
    const correo:any=document.getElementById("correo");
    const direccion:any=document.getElementById("direccion");
    const telefono:any=document.getElementById("telefono");
    const genero:any=document.getElementById("genero");
    const pais:any=document.getElementById("pais");
    const lenguaje:any=document.getElementById("lenguaje");
    const estado_c:any=document.getElementById("estadoc");

    //aqui asigno las variables al modelo
    this.patientModel.dni= dni.value;
    this.patientModel.name= nombre.value;
    this.patientModel.lastname= apellido.value;
    this.patientModel.no_historia_c= no_historia.value;
    this.patientModel.birthdate= fecha_n.value;
    this.patientModel.mail= correo.value;
    this.patientModel.address= direccion.value;
    this.patientModel.phone= telefono.value;
    this.patientModel.gender= genero.value;
    this.patientModel.country= pais.value;
    this.patientModel.language= lenguaje.value;
    this.patientModel.civilstatus= estado_c.value;


    console.log(this.patientModel);

    this.patientsService.createPatient(this.patientModel).subscribe(
      response => {
        //console.log("response "+response);
        if (response.correct) {
          // console.info("SE GUARDO CORRECTAMENTE EL REGISTRO: ", response.resp);
          // location.reload;
          this.closeModalPatient();
           return window.alert("SE GUARDO CORRECTAMENTE EL PACIENTE");
        }
      },
      error => {
        console.log(error);
      }
    );
    // limpiar formulario
    //return window.alert("SE GUARDO CORRECTAMENTE EL CONSENTIMIENTO, CON SU IDENTIFICADOR: "+this.makeid());
  }

  openModalPatient(): void {
    this.modal = document.getElementById('modalPatient');
    this.modal.style.display = 'block';
  }

  closeModalPatient(): void {
    this.modal = document.getElementById('modalPatient');
    this.modal.style.display = 'none';
  }


}
