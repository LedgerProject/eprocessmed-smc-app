
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/security/services/auth.service';
import { CustomersService } from 'src/app/service-mngmt/replace/customers.service';
import { Component, OnInit, Output, EventEmitter, Input,Inject, HostListener  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mdl-prvplc',
  templateUrl: './modal-privacy-policies.component.html',
  styleUrls: ['./modal-privacy-policies.component.css']
})
export class ModalPrivacyPoliciesComponent implements OnInit {
  public chckAcceptPlc: boolean;
  public modalPrvPlc: any;
  public url!: string;
  public politics!: any;

  @Output() PrivacyPolicies = new EventEmitter();
  @Output() CloseModalPP = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    switch (event.target.id) {
      case 'chck_acceptPlc':
          const chck_acceptPlc: any = document.getElementById('chck_acceptPlc');
          this.chckAcceptPlc = chck_acceptPlc.checked;
          this.acceptPolicy();
        break;
    }
  }

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private customer: CustomersService,
              public dialogRef: MatDialogRef <ModalPrivacyPoliciesComponent>,@Inject(MAT_DIALOG_DATA)public message:string) {
    this.chckAcceptPlc = false;
  }

  ngOnInit(): void {
    this.url = window.location.href;  
  }

  ngAfterViewChecked(): void {
    this.acceptPolicy();
  }

  acceptPolicy(): void {
    const btn_accept: any = document.getElementById('btn_accept');
    if (!this.chckAcceptPlc) {
      btn_accept.setAttribute('disabled', 'false');
    } else {
      btn_accept.removeAttribute('disabled');
      btn_accept.focus();
    }
  }

  closeModal(){
    this.dialogRef.close();
   }

  privacyPolicies(event: any, acceptPlc: any): void {
    this.dialogRef.close(acceptPlc);
  } 

}
