import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';

/* Services */
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.location.back();
    return false;
  }

}
