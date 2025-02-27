import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FeedbackModalComponent,
    FooterComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {}
