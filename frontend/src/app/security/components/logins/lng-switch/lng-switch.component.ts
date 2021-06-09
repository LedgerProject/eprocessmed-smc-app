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

// authentication: "[{\"sms\": 0, \"google\": 0, \"estandar\": 1}]"
// description: "Customer 1"
// icons: "[{\"icon1\": \"UCA_1\", \"icon2\": \"UCA_2\"}]"
// id_cat_languaje: []
// id_customer: 3
// module: "dynamic-forms"
// text_body: "Cuando rellenas el formulario D&S recibes un pre-diagnósticos sobre el estado de tu salud en relación con el Covid-19. Además un médico especialista en Urgencias te citará para una consulta telemática en la que te aconsejará sobre los siguientes pasos a seguir. D&S es un recurso gratuito para ayudarnos a reducir la curva de contagios. Tener la mejor información sobre nuestra salud desde el primer momento nos permite actuar de forma responsable."
// text_title: "Termina con la curva de contagios desde los primeros síntomas"
// time_zone: ""
// url: "http://localhost:4100/login"