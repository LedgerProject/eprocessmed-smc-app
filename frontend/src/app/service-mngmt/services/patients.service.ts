import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../general/global/global_data';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  
  constructor( private http: HttpClient ) { }

  createPatients(data:any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.newPatient}`, body, {headers: headers});
  }

}
