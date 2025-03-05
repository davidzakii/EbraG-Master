import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { Page } from '../models/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addPage(page: Page): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Page/Add`, page);
  }
  editPage(page: Page): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Page/Update`, page);
  }
  getPages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Page/All`);
  }
  getPageByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Page/PageByName`, {
      params: { name },
    });
  }
  deletePage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Page/Delete`, { params: { id } });
  }
}
