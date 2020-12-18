import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

/* Services */
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  canActivate(): boolean {
    const usrSession = this.authService.getDataSesion();
    if (usrSession.role === 'doctor' || usrSession.role === 'admin') {
      return true;
    }
    this.location.back();
    // this.router.navigate(['/login']);
    // this.authService.signOut();
    return false;
  }

}
