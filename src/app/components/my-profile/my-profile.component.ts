import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../services/dark-mode.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  defaultImg: string =
    'data:image/jpeg;base64,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';
  userMain: any | null = null;
  userData: any = {};
  userId: string = '';
  countryOptions: { key: string; value: string }[] = [
    { key: 'Country/Region', value: 'us' },
    { key: 'Canada', value: 'ca' },
    { key: 'United Kingdom', value: 'uk' },
    { key: 'Australia', value: 'in' },
  ];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const userDataString = this.localStorageService.getItem('user');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.userId = this.userData.id ?? '';
      if (this.userId) {
        this.fetchUserData();
      }
    }
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  fetchUserData() {
    const sub = this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.userData = response?.data ?? {};
      },
      error: (err) => console.error('Error fetching user data:', err),
    });
    this.subscription.add(sub);
  }

  updateProfile(event?: any) {
    const formData = new FormData();
    formData.append('id', this.userId);

    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      formData.append('ProfileImgFile', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.defaultImg = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    Object.entries(this.userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    const sub = this.userService.updateProfile(formData).subscribe({
      next: (response) => {
        if (response?.isPass) {
          this.fetchUserData();
          this.toastr.success(response?.message, 'Success');
        } else this.toastr.error(response?.message, 'Error');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.toastr.error(error?.message, 'Error');
      },
    });
    this.subscription.add(sub);
  }

  greetUser(): string {
    const userName =
      this.userData?.firstName + ' ' + this.userData?.lastName || '';
    const currentHour = new Date().getHours();
    let greeting = 'Good Evening';

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = 'Good Afternoon';
    }

    return `${greeting}, ${userName}`;
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

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = [];

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
