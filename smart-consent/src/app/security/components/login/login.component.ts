import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

/* Services */
import { FormsService } from '../../../general/services/forms.service';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../../general/services/settings.service';
import { MessagingService } from '../../../general/services/messaging.service';

import { Users } from '../../../general/models/users.model';
import { UsersService } from '../../../general/services/users.service';

/* Models */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public intPhoneCodes: any;
  public authForm: Users;
  public modalPrvPlc: any;
  public modalOtp: any;
  private usrAuth: any;
  public errorMsg: string;

  @HostListener('change', ['$event'])
  onChange(event: any): any {
    if (event.srcElement.id === 'password') {
      this.loginByDefault();
    }
  }

  constructor(
    private formsService: FormsService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private messagingService: MessagingService,
    private usersService: UsersService,
    private router: Router,
    private modalService: NgbModal) {
    this.authForm = {
      usr_id: null,
      doc_id: null,
      google_id: null,
      phone: null,
      code: 0,
      name: null,
      password: null,
      email: null,
      role: 'respondent',
      provider: 'default',
      status: null,
      created_on: null
    };
    this.getIntPhoneCodes();
   }

  ngOnInit(): void { }

  public loginByDefault(): void {
    const btn_auth: any = document.getElementById('btn_auth');
    btn_auth.focus();
  }

  getIntPhoneCodes(): any {
    this.settingsService.getParameters().subscribe(
      resp => {
        const answer = resp.resp;
        const intPhoneCodes = answer.find((params) => {
          return params.name === 'int_phone_codes';
        });
        this.intPhoneCodes = {
          name: 'Código Int.',
          id_input: 'id_input',
          params: [intPhoneCodes.params[0].data]
        };
      },
      err => {
        console.log(err);
      }
    );
  }

  getByIdUsrRespForm(id): any {
    this.formsService.getByIdUsrRespForm(id).subscribe(
      resp => {
        let routeInit: string;
        if (resp) {
          if (resp.correct && resp.resp.length > 0) {
            if (resp.resp[0].answered_check) {
              routeInit = `list-respondent-form`;
            } else {
              routeInit = `edit-respondent-form/${id}`;
            }
          } else {
            routeInit = `list-respondent-form`;
          }
          this.router.navigate([routeInit]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateStatusUsr(): any {
    const data = {
      type: 'status',
      id: this.usrAuth.id,
      dataset: {
        status: this.usrAuth.status
      }
    };

    this.usersService.updateStatusUsr(data).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  createSession(): void {
    localStorage.setItem('id', this.usrAuth.id);
    localStorage.setItem('name', this.usrAuth.name);
    localStorage.setItem('role', this.usrAuth.role);
    localStorage.setItem('token', this.usrAuth.token);
  }

  auth(): void {
    this.authService.auth(this.authForm).subscribe(
      resp => {
        this.usrAuth = resp;
        if (resp.msg === 'Authorized') {
          let routeInit: string;
          switch (resp.role) {
            case 'admin':
                routeInit = 'list-forms';
              break;
            case 'doctor':
                routeInit = 'dr-dashboard';
              break;
            case 'customer':
                routeInit = 'list-respondent-form';
              break;
            case 'respondent':
                if (resp.status === 'onhold') {
                  this.openModalPP();
                } else {
                  this.getByIdUsrRespForm(resp.id);
                }
              break;
          }
          this.createSession();
          this.router.navigate([routeInit]);
        } else {
          this.errorMsg = 'Código erróneo o caduco';
          const messageContainer = document.getElementById('messageContainer');
          const loginMessage = document.getElementById('loginMessage');
          messageContainer.classList.remove("undisplay");
          loginMessage.innerHTML = 'Usuario o contraseña no valido(a)';
        }
      },
      err => {
        const messageContainer = document.getElementById('messageContainer');
        const loginMessage = document.getElementById('loginMessage');
        messageContainer.classList.remove("undisplay");
        loginMessage.innerHTML = err;
      }
    );
  }

  unDisplay(): void {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.classList.add('undisplay');
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.authForm.google_id = data.id;
        this.authForm.name = data.name;
        this.authForm.email = data.email;
        this.authForm.provider = data.provider.toLowerCase();
        this.auth();
      }
    );
  }

  requestCodeSMS(data): void {
    const dtaSend = {
      name: `${data.otpForm.name} ${data.otpForm.lastname}`,
      intPhoneCodes: `${data.otpForm.id_input}`,
      phone: `${data.otpForm.phone}`
    };
    this.messagingService.requestCodeSMS(dtaSend).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  signInOTP(data): void {
    this.authForm.phone = `${data.otpForm.id_input}${data.otpForm.phone}`;
    this.authForm.name = `${data.otpForm.name} ${data.otpForm.lastname}`;
    this.authForm.code = data.otpForm.codeotp;
    this.authForm.provider = 'otp';
    this.auth();
  }

  privacyPolicies(data): void {
    this.createSession();
    if (data.acceptPlc === 'accept') {
      const id = this.usrAuth.id;
      this.updateStatusUsr();
      this.getByIdUsrRespForm(id);
    } else {
      this.closeModalPP();
      this.signOut();
    }
  }

  openModalPP(): void {
    this.modalPrvPlc = document.getElementById('modalPrvPlc');
    this.modalPrvPlc.style.display = 'block';
  }

  closeModalPP(): void {
    this.modalPrvPlc = document.getElementById('modalPrvPlc');
    this.modalPrvPlc.style.display = 'none';
  }

  closeModalOtp(): void {
    this.modalOtp = document.getElementById('modalOtp');
    this.modalOtp.style.display = 'none';
  }

  signOut(): void {
    this.authService.signOut();
  }

}
