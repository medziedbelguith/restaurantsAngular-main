import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlatComponent } from './edit-plat.component';

describe('EditPlatComponent', () => {
  let component: EditPlatComponent;
  let fixture: ComponentFixture<EditPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
