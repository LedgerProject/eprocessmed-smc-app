import { Component, ViewChild, HostListener, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../general/components/shared/dialog/dialog/dialog.component';
import { Router, RouterModule } from '@angular/router';

//SERVICES
import { GeneralService } from '../../../service-mngmt/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  public user: any;
  public password: any;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    if(event.target.id=="btnlogin"){
      this.getLogin(this.user, this.password);
    }

  }

  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.user="";
    this.password="";
  }

  getLogin(user:any, password:any): void {
    const dataSet = {
      process: '',
      request: 'get-login',
      data: {login:user, password:password}
    };
    this.generalService.queryGeneral(dataSet).subscribe(
      resp => {
        const estabById = resp.find((dta: any) => dta.ouput === 'get-login');
        const answer = estabById.answer;
        if (answer.correct) {
          if(answer.resp.length!=0){
            const user = answer.resp[0];
            this.router.navigate(['admin/establishment']);
          }
          else{
            this.openDialog();
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // Modal para crear eliminar registro
  openDialog(): void {
    var titleDlg = '';
    titleDlg = 'Incorrect user or password';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        titleDlg,
        action: 'Error'
      }
    });
  }

}
