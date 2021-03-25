import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtEdtCatalogDialogComponent } from './app-crt-edt-catalog-dialog.component';

describe('CrtEdtCatalogDialogComponent', () => {
  let component: CrtEdtCatalogDialogComponent;
  let fixture: ComponentFixture<CrtEdtCatalogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrtEdtCatalogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtEdtCatalogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
