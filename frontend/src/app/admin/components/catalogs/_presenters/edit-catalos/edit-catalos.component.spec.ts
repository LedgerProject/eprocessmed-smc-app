import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatalosComponent } from './edit-catalos.component';

describe('EditCatalosComponent', () => {
  let component: EditCatalosComponent;
  let fixture: ComponentFixture<EditCatalosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCatalosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
