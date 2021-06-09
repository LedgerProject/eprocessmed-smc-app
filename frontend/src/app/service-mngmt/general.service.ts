import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private url = `${globalData.urls.rootURI}${globalData.urls.genQuery}`;
  
  constructor(private http: HttpClient) { }

  queryGeneral(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, body, {headers: headers});
  }

}