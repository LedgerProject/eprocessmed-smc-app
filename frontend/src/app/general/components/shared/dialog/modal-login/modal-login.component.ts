
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  public loginForm: any;
  public msg!: string;

  constructor(public dialogRef: MatDialogRef <ModalLoginComponent>,@Inject(MAT_DIALOG_DATA)public message:string) {
    this.loginForm = {
      userName:  null,
      pass: null,     
    }
  }

  closeModal(){
   this.dialogRef.close();
  }


  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.userName === null || this.loginForm.pass === null){
      this.msg = 'Ingrese sus datos para continuar'
    }else{
      this.dialogRef.close(this.loginForm);
    }
  
  }

}
