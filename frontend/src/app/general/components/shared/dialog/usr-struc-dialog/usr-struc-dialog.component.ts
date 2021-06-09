import { Component, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-usr-struc-dialog',
  templateUrl: './usr-struc-dialog.component.html',
  styleUrls: ['./usr-struc-dialog.component.scss']
})
export class UsrStrucDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UsrStrucDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  dialogClose(): void {
    this.dialogRef.close(this.data);
  }

  dialogSave(): void {
    this.data.action = 'create';
    this.dialogRef.close(this.data);
  }

}
