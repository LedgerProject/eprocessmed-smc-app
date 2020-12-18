import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrivacyPoliciesComponent } from '../../general/components/shared/_presenters/modal-privacy-policies/modal-privacy-policies.component';

describe('ModalPrivacyPoliciesComponent', () => {
  let component: ModalPrivacyPoliciesComponent;
  let fixture: ComponentFixture<ModalPrivacyPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPrivacyPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrivacyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
