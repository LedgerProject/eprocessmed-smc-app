import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Location } from '@angular/common';

/* Services */
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location) { }

  canActivate(): boolean {
    const usrSession = this.authService.getDataSesion();
    if (usrSession.role === '0,0,0' || usrSession.role === '0,2,0') {
      return true;
    }
    this.location.back();
    return false;
  }

}
