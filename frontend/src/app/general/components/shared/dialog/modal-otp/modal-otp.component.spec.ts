import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOtpComponent } from './modal-otp.component';

describe('ModalOtpComponent', () => {
  let component: ModalOtpComponent;
  let fixture: ComponentFixture<ModalOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
