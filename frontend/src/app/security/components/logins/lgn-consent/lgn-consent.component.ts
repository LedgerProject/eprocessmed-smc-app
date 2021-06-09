import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// import { element } from 'protractor';
import { session } from '../../../../general/global/data/session';

/* Components */
import { DialogComponent } from '../../../../general/components/shared/dialog/dialog/dialog.component';
import { ModalLoginComponent } from '../../../../general/components/shared/dialog/modal-login/modal-login.component';
import { ModalOtpComponent } from '../../../../general/components/shared/dialog/modal-otp/modal-otp.component';
import { ModalAlertComponent } from '../../../../general/components/shared/dialog/modal-alert/modal-alert.component';
import { ModalOtpCheckComponent } from '../../../../general/components/shared/dialog/modal-otp-check/modal-otp-check.component';
import { ModalPrivacyPoliciesComponent } from '../../../../general/components/shared/dialog/modal-privacy-policies/modal-privacy-policies.component';

/* Services */
import { GeneralService } from '../../../../service-mngmt/general.service';
import { ParseJsonCatalogsService } from "../../../../service-mngmt/parse-json-catalogs.service";
import { AuthService } from 'src/app/security/services/auth.service';
import { OtpService } from '../../../../service-mngmt/otp.service';
import { UsersService } from '../../../../service-mngmt/users.service';
import { PwaServiceService } from '../../../../service-mngmt/pwa-service.service';

/* Interfaces */
import { User } from '../../../../general/interfaces/users.interface';

@Component({
  selector: 'app-lgn-consent',
  templateUrl: './lgn-consent.component.html',
  styleUrls: ['./lgn-consent.component.scss']
})
export class LgnConsentComponent implements OnInit {
  @Input() public domainData!: any;

  private usrAuth: any;   
  public authForm: User;
  public collector: any;
  public intPhoneCodes: any;
  public sltValues: any;
  public modalPrvPlc: any;
  public modalOtp: any;
  public url!: string;
  public checkUrl: any;
  public channelCustomer: any;
  public alertMsg!: string;
  public idEstablishment!: number;
  public idPrincipalEstab!: number; //this.url
  public loginText: string;
  public ImagesUCA!: Boolean;
  public countryPhoneCodes: any;
  public idCustomer!: number;

  public btnPatronato: boolean;
  
  @HostListener('change', ['$event'])
  onChange(event: any): any {
    if (event.srcElement.id === 'password') {
      this.loginByDefault();
    }
  }

  constructor(
    private generalService: GeneralService,
    private parseJsonCatalogsService:ParseJsonCatalogsService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private otpService: OtpService,
    private usersService: UsersService,
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog) {//, public Pwa: PwaServiceService

    this.btnPatronato = true;

    this.authForm = {
      idUser: null,
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
      idEstablishment: null,
      idSpecialist: 0,
      idCatNotification: '',
      regStatus: '',
      keyZoom: '',
      codeOtp: null
    };

    this.sltValues = {// ???????????????
      codePhone: '',
      idCatRoluser: '',
      userStructure: '',
      idCatAccesstype: '',
      idCatNotification: '',
    };

    this.collector = [];
    this.countryPhoneCodes = [];
    this.loginText = 'Registrarse';
    this.getIntPhoneCodes();
  }

  ngOnInit(): void {
    if(screen.width < 900){
      console.log('BTN INSTALL PWA');
    }
    this.idCustomer = this.domainData.id_customer;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalLoginComponent, {
      width:'350px'
    }); 
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.authForm.login = res.userName;
        this.authForm.password = res.pass;
        this.authForm.idCatAccesstype = { idCatAccesstype: '0,2,0' };
        this.authForm.idCatNotification = { idCatNotification: "0,1,0" };
        this.auth(); 
      }
    })    
  }

  openModalOtp(): void {
    const dialogRef = this.dialog.open(ModalOtpComponent, {
      width:'450px',
      data: {
        intPhoneCodes: this.intPhoneCodes
      }
    });    
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.requestCodeSMS(res);
        this.openModalOtpCheck();  
      }             
    })    
  }
   
  openModalOtpCheck(): void {
    const dialogRef = this.dialog.open(ModalOtpCheckComponent, {
      width:'450px'
    });    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
         this.signInOTP(res);
      }
    })    
  }

  openAlertModal(): void {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      width:'350px',
      data: this.alertMsg
    });    
    dialogRef.afterClosed().subscribe(res => {
      this.openDialog()            
    })    
  }

  openPrivacyPoliciesModal(): void {
    const dialogRef = this.dialog.open(ModalPrivacyPoliciesComponent, {
      width:'600px',
      data: this.alertMsg
    });    
    dialogRef.afterClosed().subscribe(res => {
      this.privacyPolicies(res);
    })    
  }

  public loginByDefault(): void {
    const btn_auth: any = document.getElementById('btn_auth');
    btn_auth.focus();
  }

  getIntPhoneCodes(): any {
    const data = {
      request: "catl-by-desc",
      data: {
        description: 'countries'
      }
    };
    this.generalService.queryGeneral(data).subscribe(
      resp => {
        const answerReq = resp.find((res: any) => res.ouput === data.request);
        if (answerReq !== undefined) {
          if (answerReq.answer.correct) {
            const answer = answerReq.answer.resp[0];
            const countries = answer.data_jb;
            this.switchJsonParse(countries,'0','countries','true', '');
          }
        }
      },
      err => {
        console.log(err+ 'error');
      }
    );
  }

  switchJsonParse = async (data: [any], traceId: string, name: string, principal: string, paramName: string) => {
    const countries = await this.parseJsonCatalogsService.switchJsonParse(data, traceId, name, principal, paramName);
    await this.phoneCodeBuilder(countries);   
  }

  phoneCodeBuilder(countries: any): void {
    countries.forEach((country: any) => {
      const data = country.data;
      const codeData = data.find((dta: any) => dta.name === 'code');
      const nameDats = data.find((dta: any) => dta.name === 'name');
      const id = codeData.id;
      const value = nameDats.value;
      this.countryPhoneCodes.push({id, value});
    });
    this.intPhoneCodes = {
      name: 'Código Int.',
      id_input: 'id_input',
      params: [this.countryPhoneCodes]
    };
  }

  updateStatusUsr(): void {
    const data = {
      request: "upd-users",
      data: {
        idUser: this.usrAuth.idUser,
        regStatus: 'active'
      }
    };
    this.generalService.queryGeneral(data).subscribe(
      resp => {
        const answerReq = resp.find((res: any) => res.ouput === data.request);
        if (answerReq !== undefined) {
          if (answerReq.answer.correct) {
            console.log('Updated status');
          }
        }
      },
      err => {
        console.log(err+ 'error');
      }
    );
  }

  createSession(): void {
    localStorage.setItem('id', this.usrAuth.idUser);
    localStorage.setItem('name', this.usrAuth.name);
    localStorage.setItem('role', this.usrAuth.idCatRoluser.idCatRoluser);
    localStorage.setItem('token', this.usrAuth.token);
    localStorage.setItem('intPhoneCodes', this.usrAuth.codePhone.codePhone);
    localStorage.setItem('customerId', `${this.idCustomer}`);
    localStorage.setItem('idEstablishment', `${this.usrAuth.idEstablishment}`);
    localStorage.setItem('idSpecialist', `${this.usrAuth.idSpecialist}`);
    localStorage.setItem('codePhone', JSON.stringify(this.usrAuth.codePhone));
    localStorage.setItem('dni', `${this.usrAuth.dni}`);
    localStorage.setItem('idCatAccesstype', JSON.stringify(this.usrAuth.idCatAccesstype));
    localStorage.setItem('idCatNotification', `${this.usrAuth.idCatNotification}`);
    localStorage.setItem('idGoogle', `${this.usrAuth.idGoogle}`);
    localStorage.setItem('lastname', `${this.usrAuth.lastname}`);
    localStorage.setItem('login', `${this.usrAuth.login}`);
    localStorage.setItem('mail', `${this.usrAuth.mail}`);
    localStorage.setItem('phone', `${this.usrAuth.phone}`);
    localStorage.setItem('userStructure', JSON.stringify(this.usrAuth.userStructure));
  }  

  auth(): void {
    const request = 'auth-otp';
    this.authService.auth(this.authForm).subscribe(
      resp => {
        const answerReq = resp.resp;
        const msg = answerReq.msg;
        const data = answerReq.data;

        //verficia si esta autorizado y si tiene un customer id
        if (msg === 'Authorized' &&  data.idCustomer ==  this.idCustomer) {
          const idCatRoluser = data.idCatRoluser.idCatRoluser;
          this.usrAuth = data;
          let routeInit;
          this.createSession();
          switch (idCatRoluser) {
            case '0,0,0':// administrator
                routeInit = 'consents';
              break;
            case '0,5,0':
            case '0,1,0':// patient
                if (data.regStatus == 'onhold') {
                  this.openPrivacyPoliciesModal();
                } else {
                  routeInit = 'consents/signature-house';
                }
              break;
            case '0,2,0':// specialist
                routeInit = 'consents/medical-dashboard';
              break;
            case '0,3,0':// customer
                routeInit = 'consents/signature-house';
              break;
          }
          if (routeInit !== undefined) {
            this.router.navigate([routeInit]);
          }
        } else {
          this.alertMsg = 'Usuario o contraseña no valido(a)';
          this.openAlertModal();  
          const messageContainer: any = document.getElementById('messageContainer');
          const loginMessage: any = document.getElementById('loginMessage');
          messageContainer.classList.remove("undisplay");
          loginMessage.innerHTML = this.alertMsg;
        }
      },
      err => {
        const messageContainer: any = document.getElementById('messageContainer');
        const loginMessage: any = document.getElementById('loginMessage');
        messageContainer.classList.remove("undisplay");
        loginMessage.innerHTML = err;
      }
    );
  }

  unDisplay(): void {
    const messageContainer: any = document.getElementById('messageContainer');
    messageContainer.classList.add('undisplay');
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.authForm.idGoogle = data.id;
        this.authForm.login = data.name;
        this.authForm.mail = data.email;
        this.authForm.idCatAccesstype = { idCatAccesstype: "0,0,0" };
        this.authForm.idCatNotification = { idCatNotification: "0,0,0" };
        this.authForm.idEstablishment = this.idPrincipalEstab;
        this.auth();
      }
    );
  }

  requestCodeSMS(data: any): void {
    const dtaSend = {
      name: data.name,
      lastname: data.lastname,
      codePhone: data.id_input,
      phone: `${data.phone}`,
      idEstablishment: this.idPrincipalEstab
    };
    this.authForm.name = data.name;
    this.authForm.lastname = data.lastname;
    this.authForm.codePhone = { codePhone: data.id_input };
    this.authForm.phone = `${data.phone}`;
    this.authForm.idEstablishment = this.idPrincipalEstab;
    this.otpService.requestCodeSMS(dtaSend).subscribe(
      res => {
        // console.log('response',res);
      },
      error => {
        console.log(error);
        this.alertMsg = 'Algo salio mal, porfavor vuelva a intentar';
        this.closeModalOtp();
        this.openAlertModal();
      }
    );
  }

  signInOTP(data: any): void {
    this.authForm.codeOtp = data;
    this.authForm.idCatAccesstype = { idCatAccesstype: "0,1,0" };
    this.authForm.idCatNotification = { idCatNotification: "0,1,0" };
    this.auth();
  }

  privacyPolicies(resp: any): void {
    if (resp === 'accept') {
      this.updateStatusUsr();
      const routeInit = 'dynamic-forms/lst-resp-forms';
      this.router.navigate([routeInit]);
    } else {
      this.signOut();
    }
  }

  closeModalOtp(): void {
    this.modalOtp = document.getElementById('modalOtp');
    this.modalOtp.style.display = 'none';
  }

  signOut(): void {
    this.authService.signOut();
  }

  installPwa(): void {
    // this.Pwa.promptEvent.prompt();
  }
  

}
