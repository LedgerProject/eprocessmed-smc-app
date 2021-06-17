import { Component } from '@angular/core';

/* Services */
import { AuthService } from 'src/app/security/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public name: string;

  constructor(private authService: AuthService) {
    const usrSession = this.authService.getDataSesion();
    this.name = `${usrSession.name} ${usrSession.lastname}`;
  }

}
