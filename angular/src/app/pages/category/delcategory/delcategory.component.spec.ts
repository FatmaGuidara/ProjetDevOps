import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelcategoryComponent } from './delcategory.component';

describe('DelcategoryComponent', () => {
  let component: DelcategoryComponent;
  let fixture: ComponentFixture<DelcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
