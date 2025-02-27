import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import {
  Feedback,
  FeedbackData,
  FeedbackResponse,
} from '../../../models/feedback';

@Component({
  selector: 'app-feedback-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-users.component.html',
  styleUrl: './feedback-users.component.scss',
})
export class FeedbackUsersComponent {
  feedbacks: Feedback[] = [];
  reasonMap: { [key: number]: string } = {
    1: 'I found a problem',
    2: 'I need service',
    3: 'I have a suggestion',
    4: 'I can develop or support',
    5: 'Other',
  };

  constructor(private usersManageSer: AdminService) {}

  ngOnInit() {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.usersManageSer.getUsersFeedback().subscribe({
      next: (value) => {
        if (value.isPass) {
          this.feedbacks = value.data;
          this.feedbacks = (value as FeedbackResponse).data.map(
            (feedback: FeedbackData) => ({
              ...feedback,
              reasonIds: feedback.reasonIds.map(
                (id) => this.reasonMap[id] || 'Unknown'
              ),
              name: feedback['name'],
              email: feedback['email'],
              message: feedback['message'],
            })
          );
        }
      },
    });
  }
}
