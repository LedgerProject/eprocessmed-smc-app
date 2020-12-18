import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-info-blockchaind',
  templateUrl: './modal-info-blockchaind.component.html',
  styleUrls: ['./modal-info-blockchaind.component.css']
})
export class ModalInfoBlockchaindComponent implements OnInit {

  @Output() CloseModalPreview = new EventEmitter();
  @Input() public consentModal2:any;

  public modal: any;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }



   closeModalPreview(): void {
    this.CloseModalPreview.emit();
  }

}
