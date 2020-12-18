import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor( private http: HttpClient ) { }

  
  getSpecialties(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getEspec}`);
  }
  
}
