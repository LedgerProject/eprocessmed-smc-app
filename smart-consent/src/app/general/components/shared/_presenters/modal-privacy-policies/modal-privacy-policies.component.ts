import { Component, OnInit, Output, EventEmitter, Input, HostListener  } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../security/services/auth.service';

@Component({
  selector: 'app-mdl-prvplc',
  templateUrl: './modal-privacy-policies.component.html',
  styleUrls: ['./modal-privacy-policies.component.css']
})
export class ModalPrivacyPoliciesComponent implements OnInit {
  public chckAcceptPlc: boolean;
  public modalPrvPlc: any;

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

  constructor(private modalService: NgbModal, private authService: AuthService) {
    this.chckAcceptPlc = false;
  }

  ngOnInit(): void { }

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

  closeModalPP(): void {
    this.CloseModalPP.emit();
  }

  privacyPolicies(event, acceptPlc): void {
    this.PrivacyPolicies.emit({
        acceptPlc
    });
  }

  // window.onclick = function(event) {
  //   if (event.target == this.modalPrvPlc) {
  //     this.modalPrvPlc.style.display = "none";
  //   }
  // }

}
