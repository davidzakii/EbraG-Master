import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private subscribtion: Subscription = new Subscription();
  darkMode: boolean = false;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      UserName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          // Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
        ],
      ],
      FirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          // Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
        ],
      ],
      LastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          // Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
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
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[.@_+'"?`#!\\/{}\[\]<>$%^&*()]).*$/
          ),
        ],
      ],
    });
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscribtion.add(sub);
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
  get PhoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }
  get Address() {
    return this.registerForm.get('Address');
  }
  get BirthDate() {
    return this.registerForm.get('BirthDate');
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
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
