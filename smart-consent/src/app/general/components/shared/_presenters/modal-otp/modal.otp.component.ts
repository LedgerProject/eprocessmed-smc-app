import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';

@Component({
  selector: 'app-mdl-otp',
  templateUrl: './modal.otp.component.html',
  styleUrls: ['./modal.otp.component.css']
})
export class ModalComponent implements OnInit {

  @Input() parameters: any;
  @Output() RequestCodeSMS = new EventEmitter();
  @Output() SignInOTP = new EventEmitter();
  @Output() CloseModalOtp = new EventEmitter();

  public otpForm: any;
  public modalOtp: any;

  constructor(private modalService: NgbModal) {
    this.otpForm = {
      name: null,
      lastname: null,
      id_input: 34,
      phone: null,
      codeotp: null
    };
  }

  ngOnInit(): void { }

  openModalOtp(): void {
    this.modalOtp = document.getElementById('modalOtp');
    this.modalOtp.style.display = 'block';
  }

  closeModalOtp(): void {
    this.CloseModalOtp.emit();
  }

  requestCodeSMS(event): void {
    if (this.otpForm.name != null && this.otpForm.lastname != null && this.otpForm.id_input != null && this.otpForm.phone != null) {
      this.RequestCodeSMS.emit({
        otpForm: this.otpForm
      });

      document.getElementById('name').setAttribute('disabled', 'true');
      document.getElementById('lastname').setAttribute('disabled', 'true');
      document.getElementById('id_input').setAttribute('disabled', 'true');
      document.getElementById('phone').setAttribute('disabled', 'true');
      document.getElementById('reqotp').setAttribute('disabled', 'true');

      document.getElementById('msgform').innerHTML = 'Bienvenido, en los próximos minutos se enviará un SMS a su teléfono con un código. A continuación, ingresar el código';
      console.log('timeout otp reset init' )
      this.ResetOtp()

    } else {
      document.getElementById('msgform').innerHTML = 'Nombre, Apellido, Código de país y Teléfono son datos requeridos';
    }
  }

  signInOTP(event): void {
    if (this.otpForm.name != null && this.otpForm.lastname != null && this.otpForm.id_input != null && this.otpForm.phone != null && this.otpForm.codeotp != null) {
      this.SignInOTP.emit({
        otpForm: this.otpForm
      });
    } else {
      document.getElementById('msgform').innerHTML = 'Código de país, Teléfono y Código SMS son datos requeridos';
    }
  }

  ResetOtp(){
    timer(300000).subscribe(() => {
      this.requestCodeSMS(event);
    });
  }

}
