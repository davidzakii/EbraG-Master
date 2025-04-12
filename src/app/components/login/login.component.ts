import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { AgreementService } from '../../services/agreement.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private token: string = '';
  darkMode: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenLogin: boolean = false;
  isResetClicke: boolean = false;
  isSetPassword: boolean = false;
  emailToResetValue: string = '';
  email: string = '';
  password: string = '';
  remember: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private agreementService: AgreementService
  ) {}

  ngOnInit(): void {
    this.getDarkMode();
    this.getToken();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    if (passwordInput.id === 'Password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
    if (passwordInput.id === 'PasswordMain')
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
            this.isModalOpenLogin = true;
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
  closeModal(name: string) {
    if (name === 'forgotPassword') this.isModalOpen = false;
    if (name === 'resetPassword') {
      this.isModalOpen = false;
      this.isResetClicke = false;
    }
    if (name === 'setPassword') {
      this.isSetPassword = false;
    }
  }
  openPopup(name: string, email: string = '') {
    if (name === 'forgotPassword') this.isModalOpen = true;
    if (name === 'resetPassword') {
      this.isModalOpen = false;
      this.isResetClicke = true;
      const sub = this.authService.forgetPassword({ email }).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isPass === true) {
            this.toastr.success(response.message);
          } else {
            this.isModalOpen = false;
            this.isResetClicke = false;
            this.toastr.error(response.message);
          }
        },
        error: (err) => {
          console.log(err);
          this.isModalOpen = false;
          this.isResetClicke = false;
          this.toastr.error(err.message);
        },
      });
      this.subscription.add(sub);
    }
  }
  closeModalLogin() {
    this.isModalOpenLogin = false;
    const sub = this.agreementService.userAgreement$.subscribe((value) => {
      this.agreementService.setUserAgreement(true);
    });
    this.subscription.add(sub);
    this.router.navigate(['/home']);
  }
  isUserDisagree() {
    const sub = this.agreementService.userAgreement$.subscribe((value) => {
      this.agreementService.setUserAgreement(false);
      this.authService.logout();
    });
    this.subscription.add(sub);
  }
  setPassword(form: any) {
    console.log(form);
    const sub = this.authService
      .resetPassword({
        email: this.emailToResetValue,
        token: this.token,
        newPassword: form.value.password,
      })
      .subscribe({
        next: (res) => {
          if (res.isPass) {
            this.toastr.success(res.message);
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }
  getToken() {
    const sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
      this.emailToResetValue = params['email'] || '';
      if (this.token !== '') {
        this.isSetPassword = true;
        this.isResetClicke = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
