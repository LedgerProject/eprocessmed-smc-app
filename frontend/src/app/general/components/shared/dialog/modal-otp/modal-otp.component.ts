import { Component, OnInit, Output, EventEmitter, Input,Inject  } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametersService } from '../../../../../service-mngmt/replace/parameters.service';
import { GeneralService } from '../../../../../service-mngmt/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-otp',
  templateUrl: './modal-otp.component.html',
  styleUrls: ['./modal-otp.component.scss']
})
export class ModalOtpComponent implements OnInit {
  @Input() parameters: any;

  @Output() RequestCodeSMS = new EventEmitter();
  @Output() SignInOTP = new EventEmitter();
  @Output() CloseModalOtp = new EventEmitter();

  public otpForm: any;
  public modalOtp: any;
  public url: any;
  public intPhoneCodes: any;
  
  constructor(
    private modalService: NgbModal,
    public dialogRef: MatDialogRef <ModalOtpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private parametersService: ParametersService,
    private generalService: GeneralService
  ) {
    this.otpForm = {
      name: null,
      lastname: null,
      id_input: 0,
      phone: null,
      codeotp: null,
      customer: null
    };
    this.intPhoneCodes = data.intPhoneCodes.params[0];
  }

  ngOnInit(): void {
    this.url = window.location.href;
  }

  openModalOtp(): void {
    this.modalOtp = document.getElementById('modalOtp');
    this.modalOtp.style.display = 'block';
  }

  closeModal(){
    this.dialogRef.close();
  }

  requestCodeSMS(): void {
    if (this.otpForm.name != null && this.otpForm.lastname != null && this.otpForm.id_input != null && this.otpForm.phone != null) {
      if(this.url==='http://test.pasaportecovid.online:4200/login'|| this.url==='http://localhost:4201/login') {
        this.otpForm.customer = '2'; 
      }
      if(this.url==='http://forms.e-processmed.com:4200/login'|| this.url==='http://localhost:4200/login'|| this.url==='http://covid19.e-processmed.com/') {
        this.otpForm.customer = '1';
      }      
      this.dialogRef.close(this.otpForm);
    } else {
      // document.getElementById('msgform').innerHTML = 'Nombre, Apellido, Código de país y Teléfono son datos requeridos';
    }
  }
}
