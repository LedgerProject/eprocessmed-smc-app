import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoBlockchaindComponent } from './modal-info-blockchaind.component';

describe('ModalInfoBlockchaindComponent', () => {
  let component: ModalInfoBlockchaindComponent;
  let fixture: ComponentFixture<ModalInfoBlockchaindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoBlockchaindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoBlockchaindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
