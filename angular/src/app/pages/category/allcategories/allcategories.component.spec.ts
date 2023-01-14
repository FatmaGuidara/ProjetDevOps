import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcategoriesComponent } from './allcategories.component';

describe('AllcategoriesComponent', () => {
  let component: AllcategoriesComponent;
  let fixture: ComponentFixture<AllcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
