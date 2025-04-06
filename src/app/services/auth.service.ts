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
    return this.http.post(`${this.apiURL}/Account/Login`, credentials);
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

    return this.http.post(`${this.apiURL}/Account/RegisterUser`, formData);
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
  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/Account/ForgetPassword`, email, {
      headers: this.headers,
    });
  }
  resetPassword(
    email: string,
    token: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.apiURL}/Account/ResetPassword`, {
      email,
      token,
      newPassword,
    });
  }

  signInWithGoogl(): Observable<any> {
    return this.http.get(`${this.apiURL}/Account/signin-google`, {
      headers: this.headers,
    });
  }

  googleCallBack(): Observable<any> {
    return this.http.get(`${this.apiURL}/Account/google-callback`);
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

  // loginWithGoogle() {
  //   google.accounts.oauth2
  //     .initTokenClient({
  //       client_id: environment.googleClientId,
  //       scope: 'profile email',
  //       callback: (response: any) => {
  //         if (response.access_token) {
  //           this.verifyGoogleToken(response.access_token);
  //         }
  //       },
  //     })
  //     .requestAccessToken();
  // }
  // private verifyGoogleToken(token: string) {
  //   this.http
  //     .get(`${this.apiURL}/Account/signin-google?access_token=${token}`)
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log('✅ بيانات المستخدم:', res);
  //         localStorage.setItem('user', JSON.stringify(res));
  //         this.setAuthenticated(true);
  //         this.router.navigate(['/home']);
  //       },
  //       error: (err) => console.error('❌ فشل استرجاع بيانات المستخدم', err),
  //     });
  // }

  loginWithGoogle() {
    const clientId = environment.googleClientId;
    const redirectUri = `${this.apiURL}/Account/google-callback/`; // نقطة الـ callback في الـ Backend
    const scope = 'profile email';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}`;

    window.location.href = authUrl; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول في Google
  }

  // private verifyGoogleToken(token: string) {
  //   this.http.post(`${this.apiURL}/auth/google-login`, { token }).subscribe({
  //     next: (res: any) => {
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('user', JSON.stringify(res.user));
  //       this.setAuthenticated(true);
  //     },
  //     error: (err) => console.error('Google login failed', err),
  //   });
  // }
}
