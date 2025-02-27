import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUsersComponent } from './feedback-users.component';

describe('FeedbackUsersComponent', () => {
  let component: FeedbackUsersComponent;
  let fixture: ComponentFixture<FeedbackUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
