import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../../../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class RespFormsService {

  constructor( private http: HttpClient ) { }

  getRespForms(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.dtaFrm}`);
  }

}
