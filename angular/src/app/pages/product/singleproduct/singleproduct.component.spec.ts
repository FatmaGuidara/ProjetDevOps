import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleproductComponent } from './singleproduct.component';

describe('SingleproductComponent', () => {
  let component: SingleproductComponent;
  let fixture: ComponentFixture<SingleproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
