import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDisclosuresComponent } from './footer-disclosures.component';

describe('FooterDisclosuresComponent', () => {
  let component: FooterDisclosuresComponent;
  let fixture: ComponentFixture<FooterDisclosuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDisclosuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterDisclosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
