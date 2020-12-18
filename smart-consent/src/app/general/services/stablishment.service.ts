import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class StablishmentService {

  constructor( private http: HttpClient ) { }


  getStablishment(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getStablishment}`);
  }

  createStablishment(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtStablishment}`, body, {headers: headers});
  }

}
