import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleuserComponent } from './singleuser.component';

describe('SingleuserComponent', () => {
  let component: SingleuserComponent;
  let fixture: ComponentFixture<SingleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
