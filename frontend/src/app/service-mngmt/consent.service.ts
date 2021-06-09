import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  constructor(private http: HttpClient) { }

  getConsentPendingPatient(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.getConsentPendingPatient}`, body, { headers: headers });
  }

  getConsentStructure(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.getProcessDetail}`, body, { headers: headers });
  }

  getConsentUsers(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.getConsentStructure}`, body, { headers: headers });
  }

  sendOtp(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.sendOtpConsent}`, body, { headers: headers });
  }

  validateOtpConsent(data: any): Observable<any> {
    const body:any = data;
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.validateOtpConsent}`, body, { headers: headers });
  }

}
