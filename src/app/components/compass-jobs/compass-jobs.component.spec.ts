import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassJobsComponent } from './compass-jobs.component';

describe('CompassJobsComponent', () => {
  let component: CompassJobsComponent;
  let fixture: ComponentFixture<CompassJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
