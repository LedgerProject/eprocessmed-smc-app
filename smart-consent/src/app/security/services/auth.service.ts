import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../general/global/global_data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public session: boolean;
  public usrSession: any;

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) {
    this.usrSession = {
      id: null,
      name: null,
      role: null,
      token: null
    };
  }

  auth(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.authUsr}`, body, {headers: headers});
  }

  getUserExists(data): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.qyrUsr}`, body, {headers: headers});
  }

  loggedIn(): boolean {
    this.session = false;
    if (localStorage.getItem('token')) {
      this.session = true;
    }
    return this.session;
  }

  getDataSesion(): any {
    this.usrSession = {
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      token: localStorage.getItem('token')
    };
    return this.usrSession;
  }

  signOut(): void {
    localStorage.clear();
    location.reload();
  }

}
