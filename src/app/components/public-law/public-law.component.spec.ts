import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLawComponent } from './public-law.component';

describe('PublicLawComponent', () => {
  let component: PublicLawComponent;
  let fixture: ComponentFixture<PublicLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
