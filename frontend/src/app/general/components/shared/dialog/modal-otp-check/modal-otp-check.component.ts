
import { Component, OnInit, Output, EventEmitter, Input,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-otp-check',
  templateUrl: './modal-otp-check.component.html',
  styleUrls: ['./modal-otp-check.component.css']
})
export class ModalOtpCheckComponent implements OnInit {
  public codeotp: any;
  public config: any;

  constructor( public dialogRef: MatDialogRef <ModalOtpCheckComponent>,@Inject(MAT_DIALOG_DATA)public message:string) { }

  ngOnInit(): void {
    
  }

  onInputChange(event: any){
     console.log('event',event);
     this.codeotp = event;
  }

  CheckOtp(){
    this.dialogRef.close(this.codeotp);
  }

  closeModal(){
    this.dialogRef.close();
  }

}