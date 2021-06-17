import { Component, OnInit, HostListener } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { AuthService } from 'src/app/security/services/auth.service';
import { ConsentService } from '../../../../../service-mngmt/consent.service';

@Component({
  selector: 'app-view-consent',
  templateUrl: './view-consent.component.html',
  styleUrls: ['./view-consent.component.scss']
})
export class ViewConsentComponent implements OnInit {
  public session: any;
  public consent: any;
  public idSpecialist:number;
  displayedColumns: string[] = ['id', 'patient', 'procedure', 'date_creation', "pdf"];
  dataSource!: DataSource<any>;

  @HostListener('click', ['$event'])
  onClickasync = async (event: any) => {
    if(event.target.id=="btnPdf"){
      var urlPdf = event.target.value;
      window.open(urlPdf, '_blank');
    }
  }

  @HostListener('change', ['$event'])
  onchange = async (event: any) => {
    console.log(event.target);
  }


  constructor(
    private authService: AuthService,
    private consentService: ConsentService
  ) {
    this.session = this.authService.getDataSesion();
    this.idSpecialist = JSON.parse(this.session.userStructure).userStructure[1].idEspecialist;
    this.getConsentBySpecialist(this.idSpecialist);
  }

  ngOnInit(): void {
  }

  //metodo que devuelve los consentimientos por id del especialista
  getConsentBySpecialist = async (idSpecialist: number) => {
    const datos = {
      idSpecialist
    }
    await this.consentService.getConsentSpecialist(datos).subscribe(
      resp => {
        const ouput = resp.resp;
        if (resp.correct) {
          this.dataSource = ouput;
        }
      },
      err => {
        console.log('getUsersConsent err', err);
      }
    );

  }

}
