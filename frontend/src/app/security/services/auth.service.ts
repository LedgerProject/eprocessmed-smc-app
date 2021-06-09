import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public session: boolean;
  public usrSession: any;

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) {
    this.usrSession = {
      id: null,
      name: null,
      role: null,
      token: null
    };
  }

  auth(data: any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${globalData.urls.rootURI}${globalData.urls.authUsr}`, body, {headers: headers});
  }
  
  // getUserExists(data): Observable<any> {
  //   const body: any = JSON.stringify(data);
  //   const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post(`${globalData.urls.rootURI}${globalData.urls.qyrUsr}`, body, {headers: headers});
  // }

  // loggedIn(): boolean {
  //   this.session = false;
  //   if (localStorage.getItem('token')) {
  //     this.session = true;
  //   }
  //   return this.session;
  // }

  getDataSesion(): any {
    this.usrSession = {
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      intPhoneCodes: localStorage.getItem('intPhoneCodes'),
      customerId: localStorage.getItem('customerId'),
      idEstablishment: localStorage.getItem('idEstablishment'),
      idSpecialist: localStorage.getItem('idSpecialist'),
      token: localStorage.getItem('token'),
      codePhone: localStorage.getItem('codePhone'),
      dni: localStorage.getItem('dni'),
      idCatAccesstype: localStorage.getItem('idCatAccesstype'),
      idCatNotification: localStorage.getItem('idCatNotification'),
      idGoogle: localStorage.getItem('idGoogle'),
      lastname: localStorage.getItem('lastname'),
      login: localStorage.getItem('login'),
      mail: localStorage.getItem('mail'),
      phone: localStorage.getItem('phone'),
      userStructure: localStorage.getItem('userStructure')
    };
    return this.usrSession;
  }

  signOut(): void {
    localStorage.clear();
    // this.router.navigate(['/login']);
    location.reload();
  }

}
