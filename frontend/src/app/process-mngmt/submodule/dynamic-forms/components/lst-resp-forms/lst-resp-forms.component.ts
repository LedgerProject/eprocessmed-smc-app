import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { time } from 'console';
import { element } from 'protractor';
import { MatDialog } from '@angular/material/dialog';

// import { ModalAlertComponent } from '../_presenters/modal-alert/modal-alert.component';

/* Services */
import { AuthService } from '../../../../../security/services/auth.service';
import { RespFormsService } from '../../services/resp-forms.service';
import { GeneralService } from '../../../../../service-mngmt/general.service';
import { FormsService } from '../../services/forms.service';

/* Interfaces */
import { RespondentForm } from '../../interfaces/forms.interface';

// import { UsersService } from '../../services/users.service';
// import { CustomersFormsService } from '../../services/customers-forms.service';

// import { MatDialog } from '@angular/material/dialog';

// import { LoaderComponent } from '../_presenters/loader/loader.component';

@Component({
  selector: 'app-lst-resp-forms',
  templateUrl: './lst-resp-forms.component.html',
  styleUrls: ['./lst-resp-forms.component.scss']
})
export class LstRespFormsComponent implements OnInit {
  public dataSesion: any;
  public respForms!: RespondentForm[];
  public userName: string | null;

  public idUser: string | null;
  public idCustomer!: string;
  public idEstablishment: string | null;
  public idSpecialist: string | null;

  public fecha!: string;
  public customerForm: any;
  public respondentForms: any;

  constructor(private respFormsService: RespFormsService, private formsService: FormsService, private authService: AuthService, private generalService: GeneralService, private router: Router) {
    this.dataSesion = this.authService.getDataSesion();
    this.userName = this.dataSesion.name;
    this.idUser = this.dataSesion.id;
    this.idCustomer = this.dataSesion.customerId;
    this.idEstablishment = this.dataSesion.idEstablishment;
    this.idSpecialist = this.dataSesion.idSpecialist;
  }

  ngOnInit(): void {
    localStorage.setItem('editMode','false');
    this.getPatientForms();
    this.validateSessionApp();

    if (this.router.url === 'dynamic-forms/lst-resp-forms') {// ?????????
      'no hacer nada'
    } else {
      this.router.navigate(['dynamic-forms/lst-resp-forms']);
    }
  }

  getPatientForms() {
    const data = {
      request: "patient-forms",
      data: {
        idCustomer: this.idCustomer,
        idUser: this.idUser,
        idEstablishment: this.idEstablishment,
        idSpecialist: this.idSpecialist
      }
    };

    this.formsService.getPatientForms(data).subscribe(resp => {
      if (resp.correct) {
        this.respondentForms = resp.answer;
      }
    }, err => {
      console.log(`Error: ${err}`);
    });

  }

  validateSessionApp(): any {
    if (localStorage.getItem('sessionStarted') === null) {
      localStorage.setItem('sessionStarted', 'true');
      location.reload();
    }
  }

}
