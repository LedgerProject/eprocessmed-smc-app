import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStablishmentComponent } from './view-stablishment.component';

describe('ViewStablishmentComponent', () => {
  let component: ViewStablishmentComponent;
  let fixture: ComponentFixture<ViewStablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStablishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
