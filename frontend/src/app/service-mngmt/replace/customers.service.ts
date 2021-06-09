import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalData } from '../../general/global/data/global_data';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  public customerIdSession: any;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.cust}`);
  }

  getPolitics(): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.custPolitics}`);
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${globalData.urls.rootURI}${globalData.urls.custById}/${id}`); 
  }

  idSession(data: any){
    this.customerIdSession = data
  }
  
}
