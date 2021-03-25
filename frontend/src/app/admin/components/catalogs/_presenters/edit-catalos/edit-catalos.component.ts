import { Component, Input, Output, EventEmitter, OnChanges, AfterViewChecked,Renderer2, ViewChild, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { GeneralService } from '../../../../../service-mngmt/services/general.service';

export interface IntfNewCatalog {//fatherStrct
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
  selector: 'app-edit-catalos',
  templateUrl: './edit-catalos.component.html',
  styleUrls: ['./edit-catalos.component.scss']
})
export class EditCatalosComponent implements OnChanges, AfterViewChecked {

  @Input() public idCatalog: any;
  @Input() public catalog: any;
  @Input() public structure: any;

  @Output() CloseEditCatalog = new EventEmitter();
  public currentValue: any;
  public previousValue: any;
  public changesCatalog!: boolean;
  public btnSaveCatalogAdtive!: boolean;

  @ViewChild('divCatalog') divCatalog!: ElementRef<any>;
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    const innerHtml = event.target.innerHTML;
    if (event.target.id === 'btnAddChildren') {
      this.changesCatalog = true;
      this.btnSaveCatalogAdtive = true;
      this.createCatalogChild(event.target);
    }
  }

  @HostListener('change', ['$event'])
  onChange(event: any): void {
    if (event.target.className === 'input') {
      this.btnSaveCatalogAdtive = true;
      this.saveInputs(this.catalog);
    }
  }

  constructor(private generalService: GeneralService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.catalog.currentValue !== changes.catalog.previousValue) {
      this.currentValue = changes.catalog.currentValue;
      this.previousValue = changes.catalog.previousValue;
      this.renewCatalogs();
    }
  }

  ngAfterViewChecked(): void { }

  parseInter(str: any): number {
    return parseInt(str);
  }

  createGeneral(data: any): void {
    this.generalService.queryGeneral(data).subscribe(
      resp => {
        const ouput = resp.filter((res: any) => res.ouput === data.request);
        const answer = ouput[0].answer;
        if (answer.correct) {
          console.log('correct: ', answer.correct);      
          console.log('answer.resp');
          console.log(answer.resp);
          location.reload();
        }
      },
      err => {
        console.error(err);
      }
    );
  };

  saveInputs(data: any): void {
    data.forEach( async (child: any) => {
      if (child.type === 'int' || child.type === 'varchar') {
        let father = this.equalize(child.father);
        father.push(child.id);
        const fatherStr = father.toString();
        const inputs: any = document.getElementById(fatherStr);
        child.value = inputs.value;
      }
      if (child.children !== undefined) {
        await this.saveInputs(child.children);
      }
    });
  }

  saveCatalog = async () => {
    await this.saveInputs(this.catalog);
    const data = {
      idCatalog: this.idCatalog,
      data: JSON.stringify(this.catalog[0])
    };
    this.createGeneral({ process: '', request: "upd-catalogs", data });
  }

  equalize = (data: any): any => {
    const str: any = JSON.stringify(data);
    const obj: any =  JSON.parse(str);
    return obj;
  };

  clearCatalogList = async () => {
    if (this.previousValue !== undefined || this.changesCatalog) {
      let divCatalog: any = document.getElementById('divCatalog');
      while (divCatalog.firstChild) {
        divCatalog.removeChild(divCatalog.firstChild);
      }
    }
  }

  renewCatalogs = async () => {
    const data = this.equalize(this.catalog);

    // Limpia la lista de catalogos de la vista.
    await this.clearCatalogList();

    // Imprime el nuevo contenido del JSON catalogos de forma recursiva.
    this.printCatalogs(data);// 
  }

  //
  printCatalogs = async (catalogs: any) => {
    catalogs.forEach( async (catalog: any) => {
      if (catalog.father.length === 0) {
        await this.addCatalogs(catalog);
      } else {
        await this.addCatalogsCh(catalog);
      }
      let children = catalog.children;
      if(children.length > 0){
        await this.printCatalogs(children);
      }
    });
  }

  itemValue(catalog: any): String {
    let name: any = '';
    let inputType;
    if(catalog.value !== 'paramGroup') {
      name = catalog.name;
    }
    const father = this.equalize(catalog.father);
    father.push(catalog.id);
    const id = `${father}`;
    switch (catalog.type) {
      case 'varchar':
          inputType = 'text';
        break;
      case 'int':
          inputType = 'number';
        break;
    }
    return `<mat-form-field appearance="fill">
              <mat-label>${name}</mat-label>
              <input type="${inputType}" id="${id}" class="input" value="${catalog.value}" >
            </mat-form-field>`;
  }

  itemChildren(catalog: any): String {
    let value: any = '';
    let html: any;
    let btn: any = '';
    if(catalog.name !== 'paramGroup') {
      value = catalog.name;
    } else if (catalog.children.length > 0 && !(catalog.id > 0)) {
      btn = `<button type="button" class="btn btnAddChildren" style="
                  background-color: #1e88e5;
                  border: none;
                  color: white;
                  font-size: 16px;
                  border-radius: 5px;
                  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
                  cursor: pointer;" id="btnAddChildren" title="" father="${catalog.father}" fatherStrct="${catalog.fatherStrct}">
                <i class="fa fa-plus-circle" id="btnAddChildren" title="" father="${catalog.father}" fatherStrct="${catalog.fatherStrct}" idctl="${catalog.id}" language="${catalog.language}"></i>
              </button>`;
    }
    html = `<mat-form-field appearance="fill">
            <mat-label>${value}</mat-label>
            <div class="col-md-1">
              ${btn}
            </div>
          </mat-form-field>`;

    return html;
  }

  addCatalogs(catalog: any): void {
    const div: HTMLParagraphElement = this.renderer.createElement('div');
    let value: any = '';
    let children: any = '';
    if (catalog.father.length > 0) {
      if (catalog.type === 'json' && catalog.name !== 'paramGroup') {
        children = this.itemChildren(catalog);
      } else {
        value = this.itemValue(catalog);
      }
    }
    div.innerHTML = `<fieldset >
                        <mat-form-field appearance="fill">
                          <mat-label>${catalog.name}</mat-label>
                        </mat-form-field>
                        ${value}
                        ${children}
                        <div id="divCatalogCh${catalog.id}" class="divCatalog" style="padding-left: 10px;"></div>
                    </fieldset>`;
    this.renderer.appendChild(this.divCatalog.nativeElement, div);
  }

  addCatalogsCh(catalog: any): void {
    const father = catalog.father.toString();
    let divCatalogCh: any;
    let value: any = '';
    let childrens: any = '';
    if (catalog.type === 'json') {
      childrens = this.itemChildren(catalog);
    } else {
      value = this.itemValue(catalog);
    }
    const childCatalog = `<fieldset >
                    ${value}
                    ${childrens}
                    <div id="divCatalogCh${father},${catalog.id}" style="padding-left: 10px;"></div>
                </fieldset>`;
    divCatalogCh = document.getElementById(`divCatalogCh${father}`);
    divCatalogCh.insertAdjacentHTML('beforeend', childCatalog);
  }
  
  /* ********************************** */
  
  // 
  updateFather = (data: any, father: any) => {
    data.forEach( async (child: any) => {
      child.father = father;
      if (child.children !== undefined) {
        const fatherCh = this.equalize(father);
        fatherCh.push(child.id);
        await this.updateFather(child.children, fatherCh);
      }
    });
  }

  // Valida si "newChildren" tiene hijos patara actualizarles el "father".
  // catalog: Objeto al que hay que agregar el hijo.
  // newChildren: Elemento hijo a agregar.
  childBuilder = async (catalog: any, father: any, newChildrenStrct: any) => {
    const lengthObj = catalog.length;
    const lastIndex = lengthObj-1;
    const newId: number = catalog[lastIndex].id + 1;
    newChildrenStrct.id = newId;
    newChildrenStrct.father = this.equalize(father);
    if (newChildrenStrct.children !== undefined) {
      const fatherCh = this.equalize(father);
      fatherCh.push(newId);
      await this.updateFather(newChildrenStrct.children, fatherCh);
    }
    catalog.push(newChildrenStrct);
    return catalog;
  }

  addNewChildCatalogs = async (obj: any, father: any, newChildren: any) => {
    let newObj;
    const index = father[0];
    let childrenObj: any =  obj[index];
    father.splice(0, 1);
    if(father.length > 0 ) {
      await this.addNewChildCatalogs(childrenObj.children, father, newChildren);
    } else {
      childrenObj.children = newChildren;
    }
  }

  selectElement = async (obj: any, structure: any, father: any, fatherPath: any, fatherStrct: any, fatherStrctPath: any, newChildren: any) => {
    const index = father[0];
    const indexStrc = fatherStrct[0];
    let children = this.equalize(obj[index]);
    let childrenStrct = this.equalize(structure[indexStrc]);
    fatherPath.push(index);
    fatherStrctPath.push(indexStrc);
    father.splice(0, 1);
    fatherStrct.splice(0, 1);

    if(fatherStrct.length > 0 ) {
      await this.selectElement(children.children, childrenStrct.children, father, fatherPath, fatherStrct, fatherStrctPath, newChildren);
    } else {
      fatherPath.pop();
      fatherStrctPath.pop();
      const fatherP =  this.equalize(fatherPath);
      const fatherStrctP =  this.equalize(fatherStrctPath);
      const newCatalosChlidrens = await this.childBuilder(obj, children.father, childrenStrct);
      this.addNewChildCatalogs(this.catalog, fatherP, newCatalosChlidrens);
    }
  }  

  createCatalogChild = async (obj: any) => {
    let fatherPath: any = [];
    let fatherStrctPath: any = [];
    let father: any = [];
    let fatherStrct: any = [];
    let newCatalog!: IntfNewCatalog;
    const strFatherStrct = obj.getAttribute("fatherStrct");
    const fatherStrctStr = strFatherStrct.split(',');
    fatherStrct = fatherStrctStr.map(this.parseInter);
    const idctl = parseInt(obj.getAttribute("idctl"));
    fatherStrct.push(idctl);
    const strFather = obj.getAttribute("father");
    const fatherStr = strFather.split(',');
    father = fatherStr.map(this.parseInter);
    father.push(idctl);
    // Acá debe seleccionar elelemento de la strutura referido en el "fatherStrct"
    await this.selectElement(this.catalog, this.structure, father, fatherPath, fatherStrct, fatherStrctPath, newCatalog);
    this.renewCatalogs();
  }

  closeEditCatalog(): void {
    this.CloseEditCatalog.emit();
  }

}
