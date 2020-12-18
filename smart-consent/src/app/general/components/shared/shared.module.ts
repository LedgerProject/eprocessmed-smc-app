import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { ExternalServicesComponent } from './external-services/external-services.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ExternalServicesComponent
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
