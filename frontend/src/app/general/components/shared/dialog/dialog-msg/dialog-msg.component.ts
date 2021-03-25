import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-msg',
  templateUrl: './dialog-msg.component.html',
  styleUrls: ['./dialog-msg.component.scss']
})
export class DialogMsgComponent {

  constructor(
    public dialogMsg: MatDialogRef<DialogMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  dialogClose(): void {
    this.dialogMsg.close(this.data);
  }

  dialogSave(): void {
    this.data.action = 'delete';
    this.dialogMsg.close(this.data);
  }

}
