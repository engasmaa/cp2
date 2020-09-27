import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddEditComponent } from './home-add-edit.component';

describe('HomeAddEditComponent', () => {
  let component: HomeAddEditComponent;
  let fixture: ComponentFixture<HomeAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
