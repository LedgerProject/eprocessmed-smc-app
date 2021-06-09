import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LngSwitchComponent } from './lng-switch.component';

describe('LngSwitchComponent', () => {
  let component: LngSwitchComponent;
  let fixture: ComponentFixture<LngSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LngSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LngSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
