import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';

/* Services */
import { PatientsService } from '../../../../general/services/patients.service';
import { ProceduresService } from '../../../../general/services/procedures.service';
import { SpecialtiesService } from '../../../../general/services/specialties.service';
import { UsersService } from '../../../../general/services/users.service';
import { ConsentsService } from '../../../../general/services/consents.service';
import { Consent } from '../../../../general/models/consent.model';
import { Color } from 'ag-grid-community';


@Component({
  selector: 'app-create-consents',
  templateUrl: './create-consents.component.html',
  styleUrls: ['./create-consents.component.css']
})
export class CreateConsentsComponent implements OnInit {
  @Output() CloseModal = new EventEmitter();

  public consentModel: Consent;
  public consentModal2: any;
  public users: any;
  public patients: any;
  public process: any;
  public specialty: any;
  public modal: any;

  //variables para obtener id y enviarlas
  public idproceso: string;
  public idpaciente: any;
  public idespecialista: string;
  public idespecialidad: string;


  @HostListener('change', ['$event'])
  onChange(event: any): void {

    if (event.target.name === 'idprocess') {
      this.idproceso = event.target.value;
    }
    if (event.target.name === 'idspecialty') {
      this.idespecialidad = event.target.value;
    }
    if (event.target.name === 'iduser') {
      this.idespecialista = event.target.value;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: any): void {

    if (event.target.attributes.group.value === 'lista') {
      this.idpaciente = event.target.id;
      //console.log(this.idpaciente);
      const obj: any = document.getElementById(this.idpaciente);
      const active = event.target.attributes.active.value;
      //console.log(active)

      if (active == "false") {
        obj.setAttribute("active", "true");
        obj.style.backgroundColor = "#7884d4";
      } else {
        obj.setAttribute("active", "false");
        obj.style.backgroundColor = "white";
      }
    }
  }

  constructor(
    private userService: UsersService,
    private patientsService: PatientsService,
    private processService: ProceduresService,
    private specialtyService: SpecialtiesService,
    private ConsentService: ConsentsService,
  ) {

    this.consentModel = {
      patient: null,
      specialist: null,
      specialty: null,
      process: null,
      risk: '0',
      video: '1',
      hashpdf: ''
    };

    this.consentModal2 = {
      paciente: null,
      medico: null,
      procedimiento: null,
      especialidad: null,
      hash: null,
      block: null
    };


    this.users = [];
    this.patients = [];
    this.process = [];
    this.specialty = [];
    this.getUsers();
    this.getPatients();
    this.getProcess();
    this.getSpecialties();
  }

  ngOnInit(): void {
    //this.openModalPreview();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      resp => {
        if (resp.correct) {
          this.users = resp.resp;
          //console.log(this.users);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPatients(): void {
    this.patientsService.getPatients().subscribe(
      resp => {
        if (resp.correct) {
          this.patients = resp.resp;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getProcess(): void {
    this.processService.getProcess().subscribe(
      resp => {
        if (resp.correct) {
          this.process = resp.resp;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      resp => {
        if (resp.correct) {
          this.specialty = resp.resp;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createConsent(): void {
    this.consentModel.patient = this.idpaciente;
    this.consentModel.specialty = this.idespecialidad;
    this.consentModel.specialist = this.idespecialista;
    this.consentModel.process = this.idproceso;
    //console.log(this.consentModel);

    this.ConsentService.createConsent(this.consentModel).subscribe(
      response => {

        this.consentModal2 = {
          paciente: this.idpaciente,
          medico: this.idespecialista,
          procedimiento: this.idproceso,
          especialidad: this.idespecialidad,
          hash: response.hash,
          block: response.block
        }

        console.log(response);

        if (response.hash) {
          // console.info("SE GUARDO CORRECTAMENTE EL REGISTRO: ", response.resp);
          // return window.alert("SE GUARDO CORRECTAMENTE EL REGISTRO");
          this.openModalPreview();
        }
      },
      error => {
        console.log(error);
      }
    );
    // limpiar formulario
    //return window.alert("SE GUARDO CORRECTAMENTE EL CONSENTIMIENTO, CON SU IDENTIFICADOR: "+this.makeid());

  }

  createtCripto(): void {
    //var crypto = require("crypto"); var id = crypto.randomBytes(40).toString('hex'); // "bb5dc8842ca31d4603d6aa11448d1654"
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 30; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


  openModalPreview(): void {
    this.modal = document.getElementById('modalPreview');
    this.modal.style.display = 'block';
  }

  closeModalPreview(): void {
    this.modal = document.getElementById('modalPreview');
    this.modal.style.display = 'none';
  }

}
