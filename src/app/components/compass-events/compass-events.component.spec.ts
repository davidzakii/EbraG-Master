import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassEventsComponent } from './compass-events.component';

describe('CompassEventsComponent', () => {
  let component: CompassEventsComponent;
  let fixture: ComponentFixture<CompassEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
