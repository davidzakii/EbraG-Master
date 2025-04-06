import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  isModalOpen: boolean = false;
  isResetClicke: boolean = false;
  emailToResetValue: string = '';
  email: string = '';
  password: string = '';
  remember: boolean = false;
  showPassword: boolean = false;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    this.showPassword = !this.showPassword;
  }
  onLogin(form: any) {
    this.authService
      .login({ email: form.value.email, password: form.value.password })
      .subscribe({
        next: (response) => {
          if (response.isPass) {
            this.localStorageService.setItem(
              'user',
              JSON.stringify(response.data)
            );
            this.localStorageService.setItem('token', response.data.token);
            this.authService.setAuthenticated(true);
            this.toastr.success(response.message);
            this.router.navigate(['/home']);
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Login Failed');
        },
      });
  }

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }
  closeModal(name: string) {
    if (name === 'forgotPassword') this.isModalOpen = false;
    if (name === 'resetPassword') {
      this.isModalOpen = false;
      this.isResetClicke = false;
    }
  }
  openPopup(name: string, email: string = '') {
    this.emailToResetValue = email;
    if (name === 'forgotPassword') this.isModalOpen = true;
    if (name === 'resetPassword') {
      this.isModalOpen = false;
      this.isResetClicke = true;
      const sub = this.authService.forgetPassword(email).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('forget password failed');
        },
      });
      this.subscription.add(sub);
    }
  }
  isValid() {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
