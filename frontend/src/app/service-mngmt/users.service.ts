import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  crtUpdUser(data:any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtUpdUser}`, body, {headers: headers});
  }

}