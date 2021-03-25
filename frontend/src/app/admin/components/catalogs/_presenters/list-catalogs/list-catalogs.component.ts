import { Component, Output, EventEmitter, Input, OnChanges, Renderer2, ViewChild, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { GeneralService } from '../../../../../service-mngmt/services/general.service';

export interface PeriodicElement {
  id_catalog: number;
  description: string;
  id_cat_language: number;
  structure_jb?:any;
  data_jb?: any;
  creation_date?: string;
  modification_date?: string;
  id_user_create?: string;
  id_user_modify?: string;
  status?: string;
}

@Component({
  selector: 'app-list-catalogs',
  templateUrl: './list-catalogs.component.html',
  styleUrls: ['./list-catalogs.component.scss']
})
export class ListCatalogsComponent implements OnChanges {

  @Input() public catalogs: any;
  @Output() EditStructure = new EventEmitter();
  @Output() EditCatalog = new EventEmitter();
  @Output() DeleteCatalog = new EventEmitter();  

  constructor(private generalService: GeneralService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.catalogs.currentValue !== changes.catalogs.previousValue) {
      this.listGeneral({ process: '', request: "catalogs" });
    }
  }

  listGeneral(data: any): void {
    this.generalService.queryGeneral(data).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          this.catalogs = answer.resp;
        }
      },
      err => {
        console.error(err);
      }
    );
  };

  editStructure(data: any): void {
    this.EditStructure.emit({idCatalog: data});
  }

  editCatalog(data: any): void {
    const catalog = this.catalogs.find((catalog: any) => catalog.id_catalog == data);
    this.EditCatalog.emit({idCatalog: catalog.id_catalog, data: [catalog.data_jb], structure: [catalog.structure_jb]});
  }

  deleteCatalog(data: any): void {
    this.DeleteCatalog.emit({idCatalog: data});
  }

  displayedColumns: string[] = ['description', 'id_cat_language', 'id_catalog'];

}
