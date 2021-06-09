import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDefaultDformsComponent } from './switch-default-dforms.component';

describe('SwitchDefaultDformsComponent', () => {
  let component: SwitchDefaultDformsComponent;
  let fixture: ComponentFixture<SwitchDefaultDformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchDefaultDformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchDefaultDformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
