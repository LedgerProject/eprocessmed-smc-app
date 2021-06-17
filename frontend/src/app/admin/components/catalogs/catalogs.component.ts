import { Component, AfterViewInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralService } from '../../../service-mngmt/general.service';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements AfterViewInit {
  public idCatalogEdit!: string;
  public catalogsStrct!: [any?];
  public catalogEdit!: [any?];
  public structureEdit!: [any?];
  public catalogs!: [any?];
  public tabAdtive!: number;
  public tabs: any;
  public tabCreateAdtive!: boolean;
  public tabListAdtive!: boolean;
  public tabEditAdtive!: boolean;
  public btnSaveCatalogStrctAdtive!: boolean;
  private tabCount!: number;
  private idEditTab!: number;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    const innerHtml = event.target.innerHTML;
    if (event.target.id === 'List' || innerHtml.indexOf("List") !== -1) {
      this.catalogs = [];
    }
  }

  constructor(private generalService: GeneralService, private renderer: Renderer2, private el: ElementRef) {
    this.valueInitials();
  }

  ngAfterViewInit() {}

  valueInitials(): void {
    this.catalogsStrct = [];
    this.tabs = ['create', 'list'];
    this.tabCount = this.tabs.length;
    this.idEditTab = 2;
    this.tabAdtive = 0;
    this.tabCreateAdtive = true;
    this.tabListAdtive = true;
    this.tabEditAdtive = true;
    this.btnSaveCatalogStrctAdtive = false;
  }

  equalize = (data: any): any => {
    const str: any = JSON.stringify(data);
    const obj: any =  JSON.parse(str);
    return obj;
  };

  apgradeCatalogsStrct(data: any): void {
    this.catalogsStrct = data;
  }

  editStructure(data: any): void {
    console.log('editStructure data');
    console.log(data);
  }

  queryGeneral(data: any): void {
    this.generalService.queryGeneral(data).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          location.reload();
        }
      },
      err => {
        console.error(err);
      }
    );
  };

  editCatalog(dtaCatalog: any): void {
    this.tabCreateAdtive = false;
    this.tabListAdtive = false;
    this.tabs.push('edit');
    this.idCatalogEdit = dtaCatalog.idCatalog;
    this.catalogEdit = this.equalize(dtaCatalog.data);
    this.structureEdit = this.equalize(dtaCatalog.structure);
    this.tabCount = this.tabs.length;
    this.tabAdtive = this.idEditTab % this.tabCount;
  }

  deleteCatalog(dataSet: any): void {
    const data = {
      idCatalog: dataSet.idCatalog,
      status: '0'
    };
    this.queryGeneral({ request: "upd-catalogs", data });
  }

  closeEditCatalog(): void {
    this.catalogEdit = [];
    this.structureEdit = [];
    this.valueInitials();
  }

}