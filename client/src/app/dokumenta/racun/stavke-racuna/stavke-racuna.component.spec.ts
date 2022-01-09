import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkeRacunaComponent } from './stavke-racuna.component';

describe('StavkeRacunaComponent', () => {
  let component: StavkeRacunaComponent;
  let fixture: ComponentFixture<StavkeRacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StavkeRacunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkeRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
