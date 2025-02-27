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
  email: string = '';
  password: string = '';
  remember: boolean = false;
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
