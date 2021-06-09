import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtRespFormComponent } from './edt-resp-form.component';

describe('EdtRespFormComponent', () => {
  let component: EdtRespFormComponent;
  let fixture: ComponentFixture<EdtRespFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtRespFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdtRespFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
