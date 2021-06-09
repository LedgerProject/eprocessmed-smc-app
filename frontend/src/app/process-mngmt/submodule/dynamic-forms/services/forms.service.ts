import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../../../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor( private http: HttpClient ) { }

  getPatientForms(data:any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.getPatientForms}`, body, {headers: headers});
  }

}
