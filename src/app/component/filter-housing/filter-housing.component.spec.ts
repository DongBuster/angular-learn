import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHousingComponent } from './filter-housing.component';

describe('FilterHousingComponent', () => {
  let component: FilterHousingComponent;
  let fixture: ComponentFixture<FilterHousingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterHousingComponent]
    });
    fixture = TestBed.createComponent(FilterHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
