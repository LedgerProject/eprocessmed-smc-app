import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.usrmmd}`);
  }

  getByIdUser(id): Observable<any> {
      return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getUsr}/${id}`);
  }

  createUser(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtUsr}`, body, {headers: headers});
  }

  updateStatusUsr(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${globalData.urls.rootURI}${globalData.urls.updUsr}`, body, {headers: headers});
  }
  
}
