import { Component, HostListener } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { AuthService } from 'src/app/security/services/auth.service';
import { ConsentService } from '../../../../../service-mngmt/consent.service';
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { NgOtpInputModule } from  'ng-otp-input';

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
    const btConfirm: any = document.getElementById('btnConfirCod');
    var video = document.getElementById('videoTag');
    var source = document.createElement('source');

    if (event.target.id == "btnNext1") {
      //aqui consulto si tiene video y se lo agrego al tag de video
      const order = this.strcuture.header[0].structure_screens.order;
      const result = order.find(element => element.frame === 'video');
      this.video = result!.text;
      source.setAttribute('src', this.video);
      video!.appendChild(source);

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
      video!.onpause
      layout2.style.display = 'block';
      layout3.style.display = 'none';
    }
    if (event.target.id == "btnNext3") {
      layout3.style.display = 'none';
      layout4.style.display = 'block';
    }
    if (event.target.id == "btnBack4") {
      video!.onpause
      layout3.style.display = 'block';
      layout4.style.display = 'none';
    }
    if (event.target.id == "btnRefuse") {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptDeclineProcess = fecha + ' ' + hora;
      //aqui actualizo el consentimiento y muestro mensaje de rechazo
      const updConsent = {
        idConsent: this.pocedure.idConsent,
        status: 'R',
        traceability: {
          time_init: '',
          hash_init: '',
          time_end: '',
          hash_final: '',
          accept_time_process: this.acceptTimeProcess,
          accept_time_personalDate: this.acceptTimePersonalDate,
          accept_time_consent_accept: this.acceptTimeConsentAccept,
          accept_decline_process: this.acceptDeclineProcess
        }
      }
      //aqui validamos si el codigo que se inngresa es el mismo con el que se registro el consent
      const objsend = {
        consent: updConsent,
        pdf: this.strcuture,
        action: "refuse",
        user:this.session
      };
      await this.updateConsent(objsend, "refuse");
    }
    if (event.target.id == "btnAcceptConsent") {
      const hoy = new Date();
      const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      this.acceptDeclineProcess = fecha + ' ' + hora;
      var data = {
        codephone: this.session.intPhoneCode,
        phone: this.session.phone,
        name: this.session.name,
        lastname: this.session.lastname,
        infoOtp: this.pocedure.infoOtp
      }
      //aqui invocamos el metodo que envia el sms y whatsapp
      this.sendOtp(data);
      this.sendWhatsapp(data);
    }
    if (event.target.id == "btnConfirCod") {
      //aqui bloqueamos el boton
      btConfirm.style.disabled = 'true';
      //aqui armamos la estructura del consent a modificar, falta data de tazabilidad
      const updConsent = {
        idConsent: this.pocedure.idConsent,
        status: 'C',
        traceability: {
          time_init: '',
          hash_init: '',
          time_end: '',
          hash_final: '',
          accept_time_process: this.acceptTimeProcess,
          accept_time_personalDate: this.acceptTimePersonalDate,
          accept_time_consent_accept: this.acceptTimeConsentAccept,
          accept_decline_process: this.acceptDeclineProcess
        }

      };
      //aqui validamos si el codigo que se inngresa es el mismo con el que se registro el consent
      const objsend = {
        consent: updConsent,
        pdf: this.strcuture,
        otp: this.infoOtp,
        action: "accept",
        user:this.session
      };
      await this.updateConsent(objsend, "accept");
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
    console.log(event.target);
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

    this.acceptTimeProcess = "";
    this.acceptTimePersonalDate = "";
    this.acceptTimeConsentAccept = "";
    this.acceptDeclineProcess = "";
    this.infoOtp = "";
    this.buttonActive = false;
    this.session = this.authService.getDataSesion();
    this.idPatient = JSON.parse(this.session.userStructure).userStructure[0].idPatient;
    this.idSpecialist = JSON.parse(this.session.userStructure).userStructure[1].idEspecialist;
    this.idEstablishment = parseInt(this.session.idEstablishment);
    this.getConsentPending(this.idPatient);
    this.getUsersConsent(this.idSpecialist, this.idEstablishment);
  }

  onOtpChange(event: any): void {
    this.infoOtp = event;
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
          const appDiv = document.getElementById('textDoc');
          appDiv!.innerHTML = this.structureOrder[0].information;
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
        console.log(ouput);
        if (resp.correct) {
          const layoutValidar: any = document.getElementById('confirSect');
          const layout4: any = document.getElementById('layout4');
          alert("Your code to sign the consent has been sent to your phone");
          layoutValidar.style.display = 'block';
          layout4.style.display = 'none';
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  sendWhatsapp = async (data: any) => {
    await this.consentService.sendWhatsapp(data).subscribe(
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

  updateConsent = async (data: any, action: string) => {
    var pdf = data.pdf;
    var header = pdf.header[0].structure_header;
    var answerDet = pdf.body;
    var arrayBody = [];
    var element = {
      order: "",
      information: ""
    };

    for (let i = 0; i < answerDet.length; i++) {
      element = {
        order: answerDet[i].order_proc,
        information: answerDet[i].information
      }
      arrayBody.push(element);
    }
    const newPdf = {
      header: header,
      body: {
        text: arrayBody,
        firmas: {
          firma_p: "",
          firma_e: ""
        }
      }
    }
    data.pdf = newPdf;
    await this.spinner();
    const spinner: any = document.getElementById('spinner');
    await this.consentService.validateOtpConsent(data).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          if (action == "accept") {
            spinner.style.display = "none";
            alert("your consent has been signed successfully");
            const btnSeePdf: any = document.getElementById('btnSeePdf');
            const btConfirm: any = document.getElementById('btnConfirCod');
            // línea ocultando el spinner
            btnSeePdf.style.display = 'block';
            btConfirm.style.display = 'none';
            this.urlPdf = ouput.urlipfs;
          }
          else {
            spinner.style.display = "none";
            window.alert("You have rejected the procedure");
            window.location.reload();
          }
        } else {
          if (action == "accept") {
            spinner.style.display = "none";
            alert("The entered code is incorrect");
          } else {
            spinner.style.display = "none";
            window.alert("Your consent could not be signed, contact your specialist for more information");
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  spinner = async () => {
    const spinner: any = document.getElementById('spinner');
    // línea muestra el spinner
    spinner.style.display = "block";
  }

  replaceLabel = async (ArrayText:string, consent:any, stablishment:any, specialist:any, patient:any) => {

      const fecha_create=consent.traceability.time_init;
      const text = ArrayText;
      const text1=text.replace(/{consentimiento.fecha_creacion}/gi, fecha_create);
      const text2=text1.replace(/{paciente.dni}/gi, patient[0].dni);
      const text3=text2.replace(/{paciente.nombre}/gi, patient[0].name_patient);
      const text4=text3.replace(/{paciente.apellido}/gi, patient[0].lastname);
      const text5=text4.replace(/{paciente.direccion}/gi, patient[0].address);
      const text6=text5.replace(/{paciente.correo}/gi, patient[0].mail);
      const text7=text6.replace(/{paciente.telefono}/gi, patient[0].phone);
      const text8=text7.replace(/{paciente.rep_dni}/gi, patient[0].dni_rep_legal);
      const text9=text8.replace(/{paciente.rep_nombre}/gi, patient[0].name_rep_legal);
      const text10=text9.replace(/{paciente.rep_apellido}/gi, patient[0].lastname_rep_legal);
      const text11=text10.replace(/{paciente.rep_direccion}/gi, patient[0].address_rep_legal);
      const text12=text11.replace(/{paciente.rep_correo}/gi, patient[0].address_rep_legal);
      const text13=text12.replace(/{paciente.rep_telefono}/gi, patient[0].phone_rep_legal);
      const text14=text13.replace(/{paciente.no_historia_c}/gi, patient[0].no_clinic_history);
      const text15=text14.replace(/{especialista.dni}/gi, specialist.dni);
      const text16=text15.replace(/{especialista.nombre}/gi, specialist.name);
      const text17=text16.replace(/{especialista.apellido}/gi, specialist.lastname);
      const text18=text17.replace(/{especialista.direccion}/gi, specialist.dni);
      const text19=text18.replace(/{especialista.telefono_fijo}/gi, specialist.phone);
      const text20=text19.replace(/{especialista.telefono_movil}/gi, specialist.phone);
      const text21=text20.replace(/{centro_de_salud.nombre}/gi, stablishment.description);
      const text22=text21.replace(/{centro_de_salud.direccion}/gi, stablishment.address);
      const text23=text22.replace(/{centro_de_salud.telefono}/gi, stablishment.phone);
      const text24=text23.replace(/{centro_de_salud.ciglas}/gi, stablishment.dni);
      const text25=text24.replace(/{procedimientos.nombre}/gi, consent);

    return text25;
  }


}
