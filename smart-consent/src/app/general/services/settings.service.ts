import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getParameters(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.params}`);
  }

}
