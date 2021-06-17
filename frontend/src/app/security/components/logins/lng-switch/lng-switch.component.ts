import { Component, Input, OnInit } from '@angular/core';

/* Services */
import { GeneralService } from '../../../../service-mngmt/general.service';

@Component({
  selector: 'app-lng-switch',
  templateUrl: './lng-switch.component.html',
  styleUrls: ['./lng-switch.component.scss']
})
export class LngSwitchComponent implements OnInit {
  public url!: string;
  public domainData!: any;
  public module!: string;
  public idPrincipalEstab!: number;

  constructor(private generalService: GeneralService) {
    this.url = window.location.href;
    localStorage.setItem('urlLogin',this.url);
    this.getByDomain();
    this.setUrl();
  }

  ngOnInit(): void { }

  setUrl() {
    let urlMeeting = this.url;
    let posUrl = urlMeeting.lastIndexOf("/");
    let posNum = posUrl;
    let newUrl= this.url.slice(0,posNum);
    localStorage.setItem('urlOrigin',`${newUrl}/meeting-confirmation/`);
  }

  getByDomain() {
    const data = {
      request: "cust-by-domine",
      data: {
        url: this.url
      }
    };
    this.generalService.queryGeneral(data).subscribe(resp => {
      const answerReq: any = resp.find((res: any) => res.ouput === data.request);
      if (answerReq !== undefined) {
        if (answerReq.answer.correct) {
          // Nota: Armar login parametrizado
          this.domainData = answerReq.answer.resp[0];
          this.module = this.domainData.module;
          this.getPrincipalEstab(this.domainData.id_customer);
        }
      }
    }, err => {
      console.log(`Error: ${err}`);
    });
  }

  getPrincipalEstab(idCustomer: number) {
    const data = {
      request: "principal-estab",
      data: {
        idCustomer
      }
    };
    this.generalService.queryGeneral(data).subscribe(resp => {
      const answerReq = resp.find((res: any) => res.ouput === data.request);

      console.log('answerReq');
      console.log(answerReq);

      if (answerReq !== undefined) {
        const correct = answerReq.answer.correct;
        const res = answerReq.answer.resp;
        if (correct) {
          this.idPrincipalEstab = res[0].id_establishment;
        }
      }
    }, err => {
      console.log(`Error: ${err}`);
    });
  }

}