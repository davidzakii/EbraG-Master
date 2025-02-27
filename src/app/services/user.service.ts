import { Injectable } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  creatFeedback(UserFeedback: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Feedback/SubmitFeedback`,
      UserFeedback
    );
  }
  updateProfile(newProfileData: FormData): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/Account/UpdateProfile`,
      newProfileData
    );
  }
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Account/GetById`, {
      params: { userId },
    });
  }
}
