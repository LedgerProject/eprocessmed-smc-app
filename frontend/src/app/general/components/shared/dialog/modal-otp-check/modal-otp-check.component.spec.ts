import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOtpCheckComponent } from './modal-otp-check.component';

describe('ModalOtpCheckComponent', () => {
  let component: ModalOtpCheckComponent;
  let fixture: ComponentFixture<ModalOtpCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOtpCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOtpCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
