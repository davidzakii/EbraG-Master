import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPageComponent } from './e-page.component';

describe('EPageComponent', () => {
  let component: EPageComponent;
  let fixture: ComponentFixture<EPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
