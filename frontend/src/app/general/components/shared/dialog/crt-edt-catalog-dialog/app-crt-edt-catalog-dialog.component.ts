import { Component, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crt-edt-catalog-dialog',
  templateUrl: './app-crt-edt-catalog-dialog.component.html',
  styleUrls: ['./app-crt-edt-catalog-dialog.component.scss']
})
export class CrtEdtCatalogDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CrtEdtCatalogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  dialogClose(): void {
    this.dialogRef.close(this.data);
  }

  dialogSave(): void {
    this.data.action = 'create';
    this.dialogRef.close(this.data);
  }

}
