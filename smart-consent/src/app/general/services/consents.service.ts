import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';


@Injectable({
  providedIn: 'root'
})
export class ConsentsService {

  constructor( private http: HttpClient ) { }

  createConsent(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtConsent}`, body, {headers: headers});
  }

}
