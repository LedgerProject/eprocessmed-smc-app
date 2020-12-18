import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../security/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public session: boolean;
  public sidebarStt: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.session = false;
    this.sidebarStt = true;
  }

  ngOnInit(): void {
    this.loggedIn();
    this.sidebarDeplCol();
  }

  // var width = screen.width;
  loggedIn(): boolean {
    const dataSesion = this.authService.getDataSesion();
    if (dataSesion.token) {
      this.session = true;
    }
    return this.session;
  }

  sidebarDeployment(): void {
    const sidebar = document.getElementById('sidebar');
    const spans: any = document.getElementsByClassName('btn_SSttSpan');
    const spansLength = spans.length;
    sidebar.classList.remove('sidebar_collapse');
    for (let i = 0; i < spansLength; i++) {
      spans[i].classList.remove('span_call');
    }
  }

  sidebarCollapse(): void {
    const sidebar = document.getElementById('sidebar');
    const spans: any = document.getElementsByClassName('btn_SSttSpan');
    const spansLength = spans.length;
    sidebar.classList.add('sidebar_collapse');
    for (let i = 0; i < spansLength; i++) {
      spans[i].classList.add('span_call');
    }
  }

  sidebarDeplCol(): void {
    console.log(this.sidebarStt);
    if (this.sidebarStt) {
      this.sidebarDeployment();
    } else {
      this.sidebarCollapse();
    }
  }

  sidebarStatus(): void {
    if (this.sidebarStt) {
      this.sidebarStt = false;
    } else {
      this.sidebarStt = true;
    }
    this.sidebarDeplCol();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
