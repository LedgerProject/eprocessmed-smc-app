import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  @Output() ToggleSnav = new EventEmitter();
  status = false;
  public showSearch = false;

  toggleSnav(): void {
    this.ToggleSnav.emit();
  }

  clickEvent(): void {
    this.status = !this.status;
  }

  constructor( ) { }

}
