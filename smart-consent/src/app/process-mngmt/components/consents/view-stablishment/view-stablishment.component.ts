import { Component, OnInit } from '@angular/core';

/* Services */
import { StablishmentService } from '../../../../general/services/stablishment.service';

@Component({
  selector: 'app-view-stablishment',
  templateUrl: './view-stablishment.component.html',
  styleUrls: ['./view-stablishment.component.css']
})
export class ViewStablishmentComponent implements OnInit {
  public stablishment: any;

  constructor(
    private stablishmentService: StablishmentService,
  ) {
    this.stablishment=[];
    this.getStablishment();
  }

  ngOnInit(): void {
  }

  getStablishment(): void {
    this.stablishmentService.getStablishment().subscribe(
      resp => {
        if (resp.correct) {
          this.stablishment = resp.resp;
          console.log(this.stablishment);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
