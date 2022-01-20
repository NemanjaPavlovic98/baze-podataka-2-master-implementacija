import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UliceComponent } from './ulice.component';

describe('UliceComponent', () => {
  let component: UliceComponent;
  let fixture: ComponentFixture<UliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UliceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
