import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureHouseComponent } from './signature-house.component';

describe('SignatureHouseComponent', () => {
  let component: SignatureHouseComponent;
  let fixture: ComponentFixture<SignatureHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
