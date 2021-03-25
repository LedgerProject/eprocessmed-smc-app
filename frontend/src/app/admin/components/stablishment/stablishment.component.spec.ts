import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StablishmentComponent } from './stablishment.component';

describe('StablishmentComponent', () => {
  let component: StablishmentComponent;
  let fixture: ComponentFixture<StablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StablishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
