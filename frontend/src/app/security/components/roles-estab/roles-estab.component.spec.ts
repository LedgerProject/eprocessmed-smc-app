import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesEstabComponent } from './roles-estab.component';

describe('RolesEstabComponent', () => {
  let component: RolesEstabComponent;
  let fixture: ComponentFixture<RolesEstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesEstabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesEstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
