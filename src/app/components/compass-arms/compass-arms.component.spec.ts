import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassArmsComponent } from './compass-arms.component';

describe('CompassArmsComponent', () => {
  let component: CompassArmsComponent;
  let fixture: ComponentFixture<CompassArmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompassArmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassArmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
