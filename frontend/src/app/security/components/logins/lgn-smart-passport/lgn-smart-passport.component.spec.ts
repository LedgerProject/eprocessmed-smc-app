import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLgnSmartPassportComponent } from './lgn-smart-passport.component';

describe('AppLgnSmartPassportComponent', () => {
  let component: AppLgnSmartPassportComponent;
  let fixture: ComponentFixture<AppLgnSmartPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLgnSmartPassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLgnSmartPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
