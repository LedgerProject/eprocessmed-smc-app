import { Component, OnInit } from '@angular/core';

/* Services */
  //  consentimientos
  //  users (centros, pacientes, espacialistas)
  //  procedimientos
import { UsersService } from '../../services/users.service';
import { ConsentsService } from '../../services/consents.service';
import { ProceduresService } from '../../services/procedures.service';

/* Modules */
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-dr-dashboard',
  templateUrl: './dr-dashboard.component.html',
  styleUrls: ['./dr-dashboard.component.css']
})
export class DrDashboardComponent implements OnInit {
  public authForm: Users;

  constructor(private usersService: UsersService, private consentsService: ConsentsService, private proceduresService: ProceduresService) {
    this.authForm = {
      usr_id: null,
      doc_id: null,
      google_id: null,
      phone: null,
      code: 0,
      name: null,
      password: null,
      email: null,
      role: 'respondent',
      provider: 'default',
      status: null,
      created_on: null
    };

    console.log(this.authForm);
  }

  ngOnInit(): void { }

}
