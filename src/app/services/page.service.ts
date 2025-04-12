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
    return this.http.post<any>(`api/Page/Add`, page);
  }
  editPage(page: Page): Observable<any> {
    return this.http.put<any>(`api/Page/Update`, page);
  }
  getPages(): Observable<any> {
    return this.http.get(`api/Page/All`);
  }
  getPageByName(name: string): Observable<any> {
    return this.http.get(`api/Page/PageByName`, {
      params: { name },
    });
  }
  deletePage(id: string): Observable<any> {
    return this.http.delete(`api/Page/Delete`, { params: { id } });
  }
}
