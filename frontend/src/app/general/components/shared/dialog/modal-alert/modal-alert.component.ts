import { Component, OnInit, Output, EventEmitter, Input,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef <ModalAlertComponent>,@Inject(MAT_DIALOG_DATA)public message:string) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }

}
