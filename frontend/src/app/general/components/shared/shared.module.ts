import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { BrowserModule } from '@angular/platform-browser';

// import { MatNativeDateModule } from '@angular/material/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { CrtEdtCatalogDialogComponent } from './dialog/crt-edt-catalog-dialog/app-crt-edt-catalog-dialog.component';
import { DialogMsgComponent } from './dialog/dialog-msg/dialog-msg.component';
import { DialogComponent } from './dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CrtEdtCatalogDialogComponent,
    DialogMsgComponent,
    DialogComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    BrowserModule
    // MatNativeDateModule
  ],
  bootstrap: [
    CrtEdtCatalogDialogComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CrtEdtCatalogDialogComponent
  ],
  entryComponents: [CrtEdtCatalogDialogComponent],
  providers: [
    MenuItems,
    // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule)
//   .catch(err => console.error(err));
