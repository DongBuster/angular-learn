import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHousingComponent } from './cart-housing.component';

describe('CartHousingComponent', () => {
  let component: CartHousingComponent;
  let fixture: ComponentFixture<CartHousingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartHousingComponent]
    });
    fixture = TestBed.createComponent(CartHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
