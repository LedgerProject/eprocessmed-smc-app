import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  constructor( private http: HttpClient ) { }


  getProcess(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getProcess}`);
  }

  createProcess(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtProcess}`, body, {headers: headers});
  }
}
