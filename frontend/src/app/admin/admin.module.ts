import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// /* Modules */
import { GeneralModule } from '../general/general.module';

// /* Components */
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { UsersComponent } from './components/users/users.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { CreateCatalogsComponent } from './components/catalogs/_presenters/create-catalogs/create-catalogs.component';
import { ListCatalogsComponent } from './components/catalogs/_presenters/list-catalogs/list-catalogs.component';
import { EditCatalosComponent } from './components/catalogs/_presenters/edit-catalos/edit-catalos.component';
import { StablishmentComponent } from './components/stablishment/stablishment.component';
import { PatientsComponent } from './components/patients/patients.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    CatalogsComponent,
    UsersComponent,
    ParametersComponent,
    CreateCatalogsComponent,
    ListCatalogsComponent,
    EditCatalosComponent,
    StablishmentComponent,
    PatientsComponent
  ],
  exports: [
    StatisticsComponent,
    CatalogsComponent,
    UsersComponent,
    ParametersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    GeneralModule,
    RouterModule,
    BrowserModule,
    FormsModule
  ],
})
export class AdminModule { }