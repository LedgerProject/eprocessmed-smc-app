import { Component } from '@angular/core';
import { GeneralService } from './service-mngmt/general.service';
import { initialData } from './general/global/data/initialData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private arrCatalos: any;

  constructor( private generalService: GeneralService ) {
    this.arrCatalos = ["specialties", "dataUpload", "countries", "gender", "languaje", "civilstatus", "relations"];
  };

  getCatalogs = async (data: any) => {
    await this.generalService.queryGeneral(data).subscribe(
        resp => {
          let catalogs: any = {};
          const ouput = resp.filter((res: any) => res.ouput === data.request);
          const answer = ouput[0].answer;
          if (answer.correct) {
            this.arrCatalos.forEach((rcatalo: any) => {
              const catalog: any = answer.resp.find((catalog: any) => catalog.description === rcatalo);
              catalogs[rcatalo] = catalog;
            });
            initialData.catalogs.push(catalogs);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

}