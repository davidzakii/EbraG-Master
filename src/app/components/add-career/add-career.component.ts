import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-career.component.html',
  styleUrl: './add-career.component.scss',
})
export class AddCareerComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  selectedFiles: File[] = [];

  constructor(private darkModeService: DarkModeService) {}
  ngOnInit(): void {
    this.getDarkMode();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById(
      'fileInput'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('File input element not found');
    }
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles = Array.from(target.files);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
