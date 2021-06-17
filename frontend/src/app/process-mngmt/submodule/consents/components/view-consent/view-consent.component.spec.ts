import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsentComponent } from './view-consent.component';

describe('ViewConsentComponent', () => {
  let component: ViewConsentComponent;
  let fixture: ComponentFixture<ViewConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
