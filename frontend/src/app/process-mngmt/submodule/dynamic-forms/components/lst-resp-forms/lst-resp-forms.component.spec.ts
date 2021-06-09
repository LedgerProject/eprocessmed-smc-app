import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstRespFormsComponent } from './lst-resp-forms.component';

describe('LstRespFormsComponent', () => {
  let component: LstRespFormsComponent;
  let fixture: ComponentFixture<LstRespFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstRespFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstRespFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
