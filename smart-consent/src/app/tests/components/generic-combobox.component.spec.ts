import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericComboboxComponent } from '../../general/components/shared/_presenters/generic-combobox/generic-combobox.component';

describe('GenericComboboxComponent', () => {
  let component: GenericComboboxComponent;
  let fixture: ComponentFixture<GenericComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
