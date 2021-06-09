import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../menu-items/menu-items';
import { AuthService } from 'src/app/security/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class SidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  status = true;
  public usrSession: any;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }

  subclickEvent() {
    this.status = true;
  }

  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.usrSession = this.authService.getDataSesion();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  validateRole(roles: string): boolean {
    let validated = false;
    if (roles.includes(`${this.usrSession.role}`) || roles.length === 0) {
      validated = true;
    }
    return validated;
  }

}
