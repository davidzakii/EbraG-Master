import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.scss',
})
export class FeedbackModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  feedbackOptions = {
    problem: false,
    service: false,
    suggestion: false,
    development: false,
    other: false,
  };
  userFeedback = {
    name: '',
    email: '',
    message: '',
  };
  feedbackForm: FormGroup;
  constructor(
    private darkModeService: DarkModeService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.feedbackForm = this.fb.group({
      feedbackOptions: this.fb.group({
        problem: [false],
        service: [false],
        suggestion: [false],
        development: [false],
        other: [false],
      }),
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }

  get name() {
    return this.feedbackForm.get('name');
  }

  get email() {
    return this.feedbackForm.get('email');
  }

  get message() {
    return this.feedbackForm.get('message');
  }

  sendFeedback() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const reasonsMap: { [key in keyof typeof feedbackOptions]: number } = {
      problem: 1,
      service: 2,
      suggestion: 3,
      development: 4,
      other: 5,
    };

    const feedbackOptions =
      this.feedbackForm.get('feedbackOptions')?.value || {};

    const reasonIds = Object.keys(feedbackOptions)
      .filter((key) => feedbackOptions[key] === true)
      .map((key) => reasonsMap[key]);

    const requestData = {
      name: this.feedbackForm.value.name,
      email: this.feedbackForm.value.email,
      message: this.feedbackForm.value.message,
      reasonIds: reasonIds.length > 0 ? reasonIds : [0],
    };
    const sub = this.userService.creatFeedback(requestData).subscribe({
      next: (value) => {
        if (value.isPass) {
          this.toastr.success(value.message);
        } else this.toastr.error(value.message);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.message);
      },
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
