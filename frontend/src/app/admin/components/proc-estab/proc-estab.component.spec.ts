import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcEstabComponent } from './proc-estab.component';

describe('ProcEstabComponent', () => {
  let component: ProcEstabComponent;
  let fixture: ComponentFixture<ProcEstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcEstabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcEstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
