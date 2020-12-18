import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getForms(): Observable<any> {
    console.log(`${globalData.urls.rootURI}${globalData.urls.frm}`);
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.frm}`);
  }

  getByIdForms(id): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getFrm}/${id}`);
  }

  createForm(data): Observable<any> {// cambiar rustas a body
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtFrm}`, body, {headers: headers});
  }

  /* export class RespondentFormsService. Nota: Optimizar */

  getRespForms(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.dtaFrm}`);
  }

  getByIdRespForm(id): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getDtaFrm}/${id}`);
  }

  getByIdUsrRespForm(id): Observable<any> {
    const body: any = JSON.stringify({id});
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.getDtaFrmUsr}`, body, {headers: headers});
  }

  createRespForm(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtDtaFrm}`, body, {headers: headers});
  }

  updateRespForm(data): Observable<any> {
    data['type'] = 'generic';
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${globalData.urls.rootURI}${globalData.urls.updDtaFrm}`, body, {headers: headers});
  }

  uploadFile(data): Observable<any> {
    console.log(data);
    // data['type'] = 'generic';
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${globalData.urls.rootURI}${globalData.urls.upFileDtaFrm}`, data);
  }

}
