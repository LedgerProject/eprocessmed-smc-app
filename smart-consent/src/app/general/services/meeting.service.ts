import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../global/global_data';
​
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
​
  constructor( private http: HttpClient ) { }
​
  getMeetings(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.meeting}`);
  }
​
  getByIdMeeting(id): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getMeeting}/${id}`);
  }
​
  getByKeyMeeting(key): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.getKeyMeeting}/${key}`);
  }
​
  confirmMeeting(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${globalData.urls.rootURI}${globalData.urls.updMeeting}`, body, {headers: headers});
  }
​
  createMeeting(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.crtMeeting}`, body, {headers: headers});
  }
​
}
