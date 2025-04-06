import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSideTabComponent } from './faqside-tab.component';

describe('FAQSideTabComponent', () => {
  let component: FAQSideTabComponent;
  let fixture: ComponentFixture<FAQSideTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FAQSideTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQSideTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
