import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private subscribtion: Subscription = new Subscription();
  darkMode: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        UserName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        FirstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        LastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        PhoneNumber: ['', [Validators.required]],
        Address: ['', [Validators.required]],
        BirthDate: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-z])(?=.*\d)(?=.*[@$!%*?&"])[a-zA-Z0-9@$!%*?&"]{8,}$/
            ),
          ],
        ],
        ConfirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator(),
      }
    );
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscribtion.add(sub);
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    if (passwordInput.id === 'Password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  get FirstName() {
    return this.registerForm.get('FirstName');
  }
  get UserName() {
    return this.registerForm.get('UserName');
  }
  get LastName() {
    return this.registerForm.get('LastName');
  }
  get Email() {
    return this.registerForm.get('Email');
  }
  get Password() {
    return this.registerForm.get('Password');
  }
  get ConfirmPassword() {
    return this.registerForm.get('ConfirmPassword');
  }
  get PhoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }
  get Address() {
    return this.registerForm.get('Address');
  }
  get BirthDate() {
    return this.registerForm.get('BirthDate');
  }
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('Password')?.value;
      const confirmPassword = formGroup.get('ConfirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { passwordsDoNotMatch: true }
        : null;
    };
  }

  register() {
    const user = this.registerForm.value;
    const sub = this.authService.register(user).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error');
      },
    });
    this.subscribtion.add(sub);
  }
  onGoogleLogin() {
    this.authService.loginWithGoogle();
    // this.authService.signInWithGoogl().subscribe({
    //   next: () => {},
    // });
  }
  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
