import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../general/global/global_data';

@Injectable({
  providedIn: 'root'
})
export class StablishmentService {

  constructor( private http: HttpClient ) { }

  createStablishment(data:any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.newStablishment}`, body, {headers: headers});
  }

}
