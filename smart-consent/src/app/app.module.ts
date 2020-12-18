import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgGridModule } from 'ag-grid-angular';

/* Modules */
import { AppRoutingModule } from './app-routing.module';
import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { GeneralModule } from './general/general.module';
import { ProcessMngmtModule } from './process-mngmt/process-mngmt.module';

/* Pipes */
import { FormatDatePipe } from './general/pipes/format-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SecurityModule,
    AdminModule,
    GeneralModule,
    ProcessMngmtModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    AgGridModule.withComponents([])
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
