import { Component, Input, Output, EventEmitter, AfterViewInit, Renderer2, ViewChild, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { GeneralService } from '../../../../../service-mngmt/general.service';
import { MatDialog } from '@angular/material/dialog';
import { CrtEdtCatalogDialogComponent }  from  '../../../../../general/components/shared/dialog/crt-edt-catalog-dialog/app-crt-edt-catalog-dialog.component' ;
import { AuthService } from 'src/app/security/services/auth.service';

export interface DialogData {
  titleDlg: string;
  name?: string;
  type?: string;
  father: [];
  action: string;
  language?: string;
};

export interface IntfNewCatalog {
  id: number,
  father: [number?],
  fatherStrct: [number?],
  name: string;
  type: string;   //  int | json | varchar
  value?: string;
  children?: any;
  required: boolean;
  language: string;
};

@Component({
  selector: 'app-create-catalogs',
  templateUrl: './create-catalogs.component.html',
  styleUrls: ['./create-catalogs.component.scss']
})
export class CreateCatalogsComponent implements AfterViewInit {

  public catalogsStrct: [any?];
  public dataSesion: any;
  
  @Input() public btnSaveCatalogStrctAdtive!: boolean;
  @Output() ApgradeCatalogsStrct = new EventEmitter();
  @ViewChild('divCatalogStrct') divCatalogStrct!: ElementRef;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    const innerHtml = event.target.innerHTML;
    if (event.target.id === 'btnAddChildStrct') {
      const obj = event.target;
      const strFather = obj.getAttribute("father");
      const idctl = obj.getAttribute("idctl");
      const language = obj.getAttribute("language");
      let father: any = [];
      if (idctl !== null) {
        if (strFather === '') {
          father.push(parseInt(idctl));
        } else {
          const fatherStr = strFather.split(',');
          father = fatherStr.map(this.parseInter); 
          father.push(parseInt(idctl));
        }
        this.openDialog('create', father, '', language);        
      }
    }

  }

  constructor(private generalService: GeneralService, private renderer: Renderer2, private el: ElementRef, private dialog: MatDialog, private authService: AuthService) {
    this.dataSesion = this.authService.getDataSesion();
    this.catalogsStrct = [];
  }

  ngAfterViewInit() {}

  parseInter(str: any): number {
    return parseInt(str);
  }

  createGeneral(data: any): void {
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
  }  

  // Modal para crear catálogos
  openDialog(typeDlg: string, father: [], type?: String, language?: String): void {
    let titleDlg = '';
    let required;
    const types: string[] = ["json","int","varchar"];
    const requireds: string[] = ["true","false"];
    const languages: string[] = ["Es","Ing","Fr"];
    switch (typeDlg) {
      case 'create':
          titleDlg = 'Crear catálogo';
        break;
      case 'edit':
          titleDlg = 'Editar catálogo';
        break;
    }
    const dialogRef = this.dialog.open(CrtEdtCatalogDialogComponent, {
      width: '250px',
      data: {
        titleDlg,
        father,
        action: '',
        types,
        type,
        requireds,
        required,
        languages,
        language
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'create':
              this.createCatalogStrct(result);
            break;
        case 'edit':
            // this.editCatalog(result);
          break;
        }
      }
    });
  }

  saveCatalogStrct = async () => {
    const data = {
      description: this.catalogsStrct[0].name,
      idCatLanguage: 1,//this.catalogsStrct[0].language
      structure: JSON.stringify(this.catalogsStrct[0]),
      data: JSON.stringify(this.catalogsStrct[0]),
      idUserCreate: parseInt(this.dataSesion.id)
      // idUserModify: 0
    };
    // envia a la DB
    this.createGeneral({ request: "rgt-catalogs", data });
  }  

  createCatalogStrct = async (data: any) => {
    const dataFatherLength = data.father.length;
    let fatherPath: any = [];
    let groupPath: any = [];
    let indexCh = 0;
    let paramGroup: IntfNewCatalog = {
      id: 0,
      father: [],
      fatherStrct: [],
      name: 'paramGroup',
      type: 'json',
      value: '',
      children: [],
      required: true,
      language: data.language
    };

    let newCatalog: IntfNewCatalog = {
      id: 0,
      father: [],
      fatherStrct: [],
      name: data.name,
      type: data.type,
      value: '',
      children: [],
      required: data.required,
      language: data.language
    };

    if (dataFatherLength === 0) {
      paramGroup.father = [indexCh];
      paramGroup.fatherStrct = [indexCh];
      newCatalog.children.push(paramGroup);
      newCatalog.id = this.catalogsStrct.length; 
      await this.catalogsStrct.push(newCatalog);
    } else {
      const filterElement = async (obj: any, fatherF: any, newChildren: any, newParamGroup: any, fatherP: any, groupP: any) => {
        let father = this.equalize(fatherF);
        let fatherPath = this.equalize(fatherP);
        let groupPath = this.equalize(groupP);
        let indexFather;
        let childrenObj;
        indexFather = father[0];
        fatherPath.push(indexFather);
        groupPath.push(indexFather);
        childrenObj = obj[indexFather];
        father.splice(0, 1);
        if(father.length > 0){
         await filterElement(childrenObj.children, father, newChildren, newParamGroup, fatherPath, groupPath);
        } else {
          const lengthObj = childrenObj.children.length;
          let newId: number;
          if (lengthObj === 0) {
            newId = lengthObj;
          } else {
            newId = childrenObj.children[lengthObj -1].id + 1;
          }
          if (newChildren.type === 'json') {
            groupPath.push(childrenObj.children.length);
            newParamGroup.father = groupPath;
            newParamGroup.fatherStrct = groupPath;
            newChildren.children.push(newParamGroup);
          }
          newChildren.father = fatherPath;
          newChildren.fatherStrct = fatherPath;
          newChildren.id = newId;
          childrenObj.children.push(newChildren);
        }
      }
      await filterElement(this.catalogsStrct, data.father, newCatalog, paramGroup, fatherPath, groupPath);
    }
    this.ApgradeCatalogsStrct.emit(this.catalogsStrct);
    this.btnSaveCatalogStrctAdtive = true;
    await this.renewCatalogsStrct(this.catalogsStrct);
  }

  equalize = (data: any): any => {
    const str: any = JSON.stringify(data);
    const obj: any =  JSON.parse(str);
    return obj;
  };

  clearCatalogStrctList(): void {
    let divCatalogStrct: any;
    divCatalogStrct = document.getElementById('divCatalogStrct');
    while (divCatalogStrct.firstChild) {
      divCatalogStrct.removeChild(divCatalogStrct.firstChild);
    }
  }

  //
  printCatalogsStrct = async (catalogs: any) => {
    catalogs.forEach( async (catalog: any) => {
      if (catalog.father.length === 0) {
        await this.addCatalogsStrct(catalog);
      } else {
        await this.addCatalogsStrctCh(catalog);
      }
      let children = catalog.children;
      if(children.length > 0){
        await this.printCatalogsStrct(children);
      }
    });
  }
 
  renewCatalogsStrct = async (catalogs: any) => {
    let data = this.equalize(catalogs);

    // Limpia la lista de catalogos de la vista.
    await this.clearCatalogStrctList();

    // Imprime el nuevo contenido del JSON catalogos de forma recursiva.
    this.printCatalogsStrct(data);
  }

  itemBtnStrct(catalog: any): String {
    return `<div class="col-md-1">
              <button type="button" class="btn btnAddChildren" style="
                  background-color: #1e88e5;
                  border: none;
                  color: white;
                  font-size: 16px;
                  border-radius: 5px;
                  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
                  cursor: pointer;" id="btnAddChildStrct" title="" father="${catalog.father}" fatherStrct="${catalog.fatherStrct}">
                <i class="fa fa-plus-circle" id="btnAddChildStrct" title="" father="${catalog.father}" fatherStrct="${catalog.fatherStrct}" idctl="${catalog.id}" language="${catalog.language}"></i>
              </button>
            </div>`;
  }

  itemValueStrct(catalog: any): any {
    return `<div class="col">
              <label class="">${catalog.name}</label>
            </div>`;
  }

  itemChildrenStrct = (catalog: any) => {
    let divId;
    let btn: any = '';
    if (catalog.father.length === 0) {
      divId = catalog.id;
    } else {
      divId = `${catalog.father},${catalog.id}`;
    }
    if (catalog.name === 'paramGroup') {
      btn = this.itemBtnStrct(catalog);
    }
    return `${btn}<div id="divCatalogStrctCh${divId}" style="padding-left: 10px;"></div>`;
  }

  addCatalogsStrct = async (catalog: any) => {
    const div: HTMLParagraphElement = this.renderer.createElement('div');
    let childrens: any = this.itemChildrenStrct(catalog);
    let value: any = this.itemValueStrct(catalog);
    div.innerHTML = `<fieldset >
                      ${value}
                      ${childrens}
                    </fieldset>`;
    this.renderer.appendChild(this.divCatalogStrct.nativeElement, div);
  }

  addCatalogsStrctCh = (catalog: any) => {
    const father = catalog.father.toString();
    let divCatalogStrctCh: any;
    let value: any = '';
    let childrens: any = '';
    if(catalog.name !== 'paramGroup'){
      value = this.itemValueStrct(catalog);
    }
    if (catalog.type === 'json') {
      childrens = this.itemChildrenStrct(catalog);
    }
    const catalogsStrctCh = `<div >
                              ${value}
                              ${childrens}
                            </div>`;
    divCatalogStrctCh = document.getElementById(`divCatalogStrctCh${catalog.father}`);
    divCatalogStrctCh.insertAdjacentHTML('beforeend', catalogsStrctCh);
  }

}
