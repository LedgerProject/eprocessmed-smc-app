import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatalogsComponent } from './list-catalogs.component';

describe('ListCatalogsComponent', () => {
  let component: ListCatalogsComponent;
  let fixture: ComponentFixture<ListCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatalogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
