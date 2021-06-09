import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgnConsentComponent } from './lgn-consent.component';

describe('LgnConsentComponent', () => {
  let component: LgnConsentComponent;
  let fixture: ComponentFixture<LgnConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgnConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgnConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
