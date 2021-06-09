import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrStrucDialogComponent } from './usr-struc-dialog.component';

describe('UsrStrucDialogComponent', () => {
  let component: UsrStrucDialogComponent;
  let fixture: ComponentFixture<UsrStrucDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrStrucDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrStrucDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
