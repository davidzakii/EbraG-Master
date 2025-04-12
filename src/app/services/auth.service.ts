import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.apiUrl;
  private authenticated = new BehaviorSubject<boolean>(this.isAuthenticated());
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  authenticated$ = this.authenticated.asObservable();

  getAuthenticated() {
    return this.authenticated.value;
  }
  setAuthenticated(isAuth: boolean): void {
    this.authenticated.next(isAuth);
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`api/Account/Login`, credentials);
  }

  register(credentials: User): Observable<any> {
    const formData = new FormData();

    for (const key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        formData.append(
          key,
          credentials[key as keyof typeof credentials] || ''
        );
      }
    }

    return this.http.post(`api/Account/RegisterUser`, formData);
  }
  isAdmin(): boolean {
    // تأكد أن الكود يعمل على المتصفح فقط
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const userData = this.localStorageService.getItem('user');
    if (!userData) return false;

    try {
      return JSON.parse(userData).role === 'Admin';
    } catch (error) {
      console.error('Error parsing user data:', error);
      return false;
    }
  }
  forgetPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(`api/Account/ForgetPassword`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  resetPassword(data: {
    email: string;
    token: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.post(`api/Account/ResetPassword`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authenticated.next(false);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loginWithGoogle() {
    window.location.href = `/api/Account/signin-google`;
  }
}
