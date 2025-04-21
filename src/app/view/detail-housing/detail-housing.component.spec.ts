import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHousingComponent } from './detail-housing.component';

describe('DetailHousingComponent', () => {
  let component: DetailHousingComponent;
  let fixture: ComponentFixture<DetailHousingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHousingComponent]
    });
    fixture = TestBed.createComponent(DetailHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
