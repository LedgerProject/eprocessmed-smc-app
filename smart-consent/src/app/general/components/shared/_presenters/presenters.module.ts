import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

/* Components */
import { ModalComponent } from "./modal-otp/modal.otp.component";
import { ModalPrivacyPoliciesComponent } from './modal-privacy-policies/modal-privacy-policies.component';
import { GenericComboboxComponent } from './generic-combobox/generic-combobox.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalPrivacyPoliciesComponent,
    GenericComboboxComponent
  ],
  exports:  [
    ModalComponent,
    ModalPrivacyPoliciesComponent,
    GenericComboboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PresentersModule { }
