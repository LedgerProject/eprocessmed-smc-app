import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseJsonCatalogsService {

  // Recorre JSON de Catalogos general.
  switchJsonParse = async (data: [any], traceId: string, name: string, principal: string, paramName: string) => {
    const collector = await this.childJson([data], traceId, name, principal, paramName);
    return collector;
  }

  childJson = async (data: [any], strTraceId: string, name:string, principal:string, paramName:string) => {
    const traceIdStr: any = strTraceId.split(',');
    const traceId = traceIdStr.map(this.parseInter);
    const id = traceId[0];
    const record = data[id];
    var collector: any = [];
    var dta: any = [];
    traceId.splice(0, 1);
    if (paramName === '') {
      paramName = 'name';
    }
    if (traceId.length > 0) {
      const strId = traceId.toString();
      await this.childJson(record.children, strId, name, principal, paramName);
    } else {
      if(principal == 'true') {
        dta= record.children;
      } else {
        if (name !== '') {
          const dtaChid = record.children.find((param: any) => param.name === name);   
          if (dtaChid.children !== undefined) {
            dta = dtaChid.children;
          }          
        }
      }
      // Separar y parametrizar solo para construir selectores
      dta.forEach( async (datachild: any) => {
        const idChild = `${datachild.father},${datachild.id}`;
        let params: any = {};
        let data: any = [];
        params[`id`] = idChild;
        datachild.children.forEach((element: any, index: any) => {
          data.push({ id: `${idChild},${index}`, name: element.name, value: element.value });
        });
        params['data'] = data;
        collector.push(params);
      });
    }
    
    return collector;
  }

  parseInter(str: any): number {
    return parseInt(str);
  }
  
}
