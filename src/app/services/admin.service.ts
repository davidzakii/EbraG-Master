import { Injectable } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getNotApprovedUsers(): Observable<any> {
    return this.http.get(`api/Account/GetNotApprovedUsers`);
  }
  setApprovedUser(userId: string): Observable<any> {
    return this.http.put(`api/Account/ApproveUser`, null, {
      params: { userId },
    });
  }
  getUsersFeedback(): Observable<any> {
    return this.http.get(`api/Feedback/All`);
  }
}
