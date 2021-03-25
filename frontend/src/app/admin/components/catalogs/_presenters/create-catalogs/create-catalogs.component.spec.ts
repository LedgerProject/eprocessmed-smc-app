import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalogsComponent } from './create-catalogs.component';

describe('CreateCatalogsComponent', () => {
  let component: CreateCatalogsComponent;
  let fixture: ComponentFixture<CreateCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCatalogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
