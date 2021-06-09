import { Component, HostListener } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { AuthService } from 'src/app/security/services/auth.service';
import { ConsentService } from '../../../../../service-mngmt/consent.service';

@Component({
  selector: 'app-signature-house',
  templateUrl: './signature-house.component.html',
  styleUrls: ['./signature-house.component.scss']
})
export class SignatureHouseComponent {
  buttonActive: boolean;
  public session: any;
  public consent: any;
  public pocedure: any;
  public idPatient: any;
  public idSpecialist: number;
  public idEstablishment: number;
  public Specialist!: any;
  public Establishment!: any;
  public obj: any;
  public urlPdf: any;
  public structureOrder: any;
  public video: any;
  public infoOtp: string;
  public acceptTimeProcess: string;
  public acceptTimePersonalDate: string;
  public acceptTimeConsentAccept: string;
  public acceptDeclineProcess: string;
  public strcuture = {
    header: [
      {
        id_struc_proc: 0,
        structure_screens: {
          order: [
            {
              text: '',
              frame: '',
              position: ''
            }
          ]
        },
        structure_header: {
        },
        structure_body: {
          order: [
            {
            }
          ]
        }
      }
    ],
    body: [
      {
        id_det_strpro: 2,
        id_struc_proc: '',
        order_proc: '',
        information: ''
      }
    ]
  }
  displayedColumns: string[] = ['id', 'procedure', 'specialty', "action"];
  dataSource!: DataSource<any>;

  @HostListener('click', ['$event'])
  onClickasync = async (event: any) => {
    //pantallas principales
    const divlayout: any = document.getElementById('divLayout');
    const divtable: any = document.getElementById('divTable');
    if (event.target.id == "btnStart") {
      divlayout.style.display = 'block';
      divtable.style.display = 'none';
      var elementProcess = event.target.value.split(";");
      this.pocedure = {
        idConsent: elementProcess[0],
        idspecialist: elementProcess[1],
        catSpecialty: elementProcess[2],
        catProcess: elementProcess[3],
        infoOtp: elementProcess[4],
        procedureName: elementProcess[5],
        specialtyName: elementProcess[6]

      }
      //AQUI TENGO QUE OBTENER DATOS PARA LAS PANTALLAS POR EL ID DEL CONSENTIMIENTO
      await this.getStructureProcess(this.pocedure.catSpecialty, this.pocedure.catProcess);
    }
    //pantallas de pasos
    const layout1: any = document.getElementById('layout1');
    const layout2: any = document.getElementById('layout2');
    const layout3: any = document.getElementById('layout3');
    const layout4: any = document.getElementById('layout4');

    //pantalla de datos personales
    const layoutDatosP: any = document.getElementById('layoutP');
    const layoutTextoConsent: any = document.getElementById('layoutTexto');
    const layoutValidar: any = document.getElementById('confirSect');
    const btnSeePdf: any = document.getElementById('btnSeePdf');
    const btConfirm: any = document.getElementById('btnConfirCod');

    if (event.target.id == "btnNext1") {
      const order = this.strcuture.header[0].structure_screens.order;
      const result = order.find(element => element.frame === 'video');
      this.video = result!.text;
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptTimeProcess = fecha + ' ' + hora;
      layout1.style.display = 'none';
      layout2.style.display = 'block';
    }
    if (event.target.id == "btnBack2") {
      layout1.style.display = 'block';
      layout2.style.display = 'none';
    }
    if (event.target.id == "btnNext2") {
      //aqui obtengo si el procedimiento tiene video
      const order = this.strcuture.header[0].structure_screens.order;
      const result = order.find(element => element.frame === 'video');
      if (result!.text == '') {
        layout2.style.display = 'none';
        layout4.style.display = 'block';
      } else {
        layout2.style.display = 'none';
        layout3.style.display = 'block';
      }


    }
    if (event.target.id == "btnBack3") {
      layout2.style.display = 'block';
      layout3.style.display = 'none';
    }
    if (event.target.id == "btnNext3") {
      layout3.style.display = 'none';
      layout4.style.display = 'block';
    }
    if (event.target.id == "btnRefuse") {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptDeclineProcess = fecha + ' ' + hora;
      //aqui actualizo el consentimiento y muestro mensaje de rechazo
      const updConsent = {
        idConsent: this.pocedure.idConsent,
        status:'R',
        traceability: {
           time_init:'' ,
           hash_init: '',
           time_final: '',
           hash_final:'',
           accept_time_process:this.acceptTimeProcess,
           accept_time_personalDate:this.acceptTimePersonalDate,
           accept_time_consent_accept:this.acceptTimeConsentAccept,
           accept_decline_process:this.acceptDeclineProcess
        }

      }
      //aqui validamos si el codigo que se inngresa es el mismo con el que se registro el consent
      const objsend = {
        consent: updConsent,
        pdf: this.strcuture,
      };
      await this.updateConsent(objsend,"refuse");
    }
    if (event.target.id == "btnAcceptConsent") {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptDeclineProcess = fecha + ' ' + hora;
      var data = {
        codephone: "593",
        phone: this.session.phone,
        name: this.session.name,
        lastname: this.session.lastname,
        infoOtp: this.pocedure.infoOtp
      }
      //aqui invocamos el metodo que envia el sms
      this.sendOtp(data);
      alert("Your code to sign the consent has been sent to your phone");
      layoutValidar.style.display = 'block';
      layout4.style.display = 'none';
    }
    if (event.target.id == "btnConfirCod") {
      //aqui armamos la estructura del consent a modificar, falta data de tazabilidad
      const updConsent = {
        idConsent: this.pocedure.idConsent,
        status:'C',
        traceability: {
           time_init:'' ,
           hash_init: '',
           time_final: '',
           hash_final:'',
           accept_time_process:this.acceptTimeProcess,
           accept_time_personalDate:this.acceptTimePersonalDate,
           accept_time_consent_accept:this.acceptTimeConsentAccept,
           accept_decline_process:this.acceptDeclineProcess
        }

      };
      //aqui validamos si el codigo que se inngresa es el mismo con el que se registro el consent
      const objsend = {
        consent: updConsent,
        pdf: this.strcuture,
        otp: this.infoOtp
      };
      await this.updateConsent(objsend,"accept");
    }
    if (event.target.id == "btnSeePdf") {
      window.open(this.urlPdf, '_blank');
      window.location.reload();
    }

    //Pantallas de datos extras(datos personales, texto pdf, etc)
    //pantalla de datos personales
    if (event.target.id == "link") {
      layout2.style.display = 'none';
      layoutDatosP.style.display = 'block';
    }
    if (event.target.id == "btnProt") {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptTimePersonalDate = fecha + ' ' + hora;
      layout2.style.display = 'block';
      layoutDatosP.style.display = 'none';
    }
    //pantalla de texto e consent
    if (event.target.id == "btnConsent") {
      layout2.style.display = 'none';
      layoutTextoConsent.style.display = 'block';
    }
    if (event.target.id == "btnTexto") {
      layout2.style.display = 'block';
      layoutTextoConsent.style.display = 'none';
    }
  }

  @HostListener('change', ['$event'])
  onchange = async (event: any) => {
  }

  constructor(
    private authService: AuthService,
    private consentService: ConsentService
  ) {
    this.pocedure = {
      idConsent: '',
      idspecialist: '',
      catSpecialty: '',
      catProcess: '',
      infoOtp: '',
      procedureName: '',
      specialtyName: ''
    }

    this.Specialist = {
      id_user: null,
      dni: '',
      name: '',
      lastname: '',
      login: '',
      password_user: '',
      mail: '',
      code_phone: {},
      phone: '',
      id_google: '',
      id_hash_alastria: '',
      id_cat_roluser: {},
      user_structure: { userStructure: [] },
      id_cat_accesstype: {},
      id_establishment: '',
      id_specialist: '',
      id_cat_notification: {},
      key_zoom: null,
      reg_status: null,
      code_otp: null,
      creation_date: '',
      modification_date: '',
      id_user_create: '',
      id_user_modify: '',
      status: ''
    };

    this.Establishment = {
      id_establishment: null,
      id_customer: '',
      description: '',
      dni: '',
      address: '',
      phone: '',
      mail: '',
      id_cat_location: {},
      id_cat_type: {},
      contact_name: '',
      contact_phone: '',
      specialist_sign: '',
      hash: '',
      url_hash: '',
      patient_load: '',
      id_cat_patient_load: {},
      id_cat_patient_val: {},
      principal: true,
      creation_date: '',
      modification_date: '',
      id_user_create: '',
      id_user_modify: '',
      status: ''
    };

    this.acceptTimeProcess="";
    this.acceptTimePersonalDate="";
    this.acceptTimeConsentAccept="";
    this.acceptDeclineProcess="";
    this.infoOtp = "";
    this.buttonActive = false;
    this.session = this.authService.getDataSesion();
    this.idPatient = JSON.parse(this.session.userStructure).userStructure[0].idPatient;
    this.idSpecialist = JSON.parse(this.session.userStructure).userStructure[1].idEspecialist;
    this.idEstablishment = parseInt(this.session.idEstablishment);
    this.getConsentPending(this.idPatient);
    this.getUsersConsent(this.idSpecialist, this.idEstablishment);
  }

  ngOnInit(): void {
  }

  testCheck(event: any) {
    const divEnabled: any = document.getElementById('buttonEnabled');
    const divDisabled: any = document.getElementById('buttonDisabled');
    if (event.target.checked == true) {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptTimeConsentAccept = fecha + ' ' + hora;
      divEnabled.style.display = 'block';
      divDisabled.style.display = 'none';
    } else {
      divEnabled.style.display = 'none';
      divDisabled.style.display = 'block';
    }
  }

  //metodo que obtiene consentimientos pendiente (firma casa) paciente
  getConsentPending = async (userSession: any) => {
    var idPatient = userSession;
    const data = {
      idPatient,
      patientCompleted: "0",
      homeFirm: "1"
    }
    await this.consentService.getConsentPendingPatient(data).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          this.dataSource = ouput;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //metodo que obtiene la estrcutura de las pantallas y otros datos del consentimiento
  getStructureProcess = async (idSpecialty: string, idProcess: string) => {
    const datos = {
      idCatProcess: { procedures: idProcess, specialties: idSpecialty }
    }
    await this.consentService.getConsentStructure(datos).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          this.strcuture = ouput[0];        
          //ascending
          this.structureOrder = this.strcuture.body.sort((a, b) => a.id_det_strpro - b.id_det_strpro);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //metodo que devuelve los datos del specialist y clinica
  getUsersConsent = async (idSpecialist: number, idEstablishment: number) => {
    const datos = {
      idSpecialist,
      idEstablishment
    }
    await this.consentService.getConsentUsers(datos).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          this.obj = ouput;
          this.Specialist = this.obj.specialist;
          this.Establishment = this.obj.establishment;
        }
      },
      err => {
        console.log('getUsersConsent err', err);
      }
    );

  }

  sendOtp = async (data: any) => {
    await this.consentService.sendOtp(data).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          this.urlPdf = ouput;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateConsent = async (data: any, action:string) => {
    var pdf = data.pdf;
    var header=pdf.header[0].structure_header;
    var answerDet=pdf.body;
    var arrayBody=[];

    var element={
      order:"",
      information:""
    };

    for (let i = 0; i < answerDet.length; i++) {
      element={
        order:answerDet[i].order_proc,
        information:answerDet[i].information
      }
      arrayBody.push(element);
    }

    const newPdf = {
      header:header,
      body:{
        text:arrayBody,
        firmas:{
          firma_p:"",
          firma_e:""
        }
      }
    }

    data.pdf=newPdf;

    await this.consentService.validateOtpConsent(data).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          if(action=="accept"){
          const btnSeePdf: any = document.getElementById('btnSeePdf');
          const btConfirm: any = document.getElementById('btnConfirCod');
          alert("your consent has been signed successfully");
          this.urlPdf = ouput.urlipfs;
          btnSeePdf.style.display = 'block';
          btConfirm.style.display = 'none';
          }
          else{
            window.alert("You have rejected the procedure");
            window.location.reload();
          }

        } else {
          if(action=="accept"){
            alert("The entered code is incorrect");
          }else{
            window.alert("Your consent could not be signed, contact your specialist for more information");
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
