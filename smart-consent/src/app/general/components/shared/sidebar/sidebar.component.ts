import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../security/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public dataSesion: any;
  public nameAPP: string;
  public titleListFrms: string;

  constructor(private authService: AuthService) {
    this.nameAPP = 'Smart Consent';
    this.titleListFrms = 'Formularios Dinámicos';
    this.dataSesion = this.authService.getDataSesion();
  }

  ngOnInit(): void { }

}
