import { Injectable } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SideTab } from '../models/side-tab';

@Injectable({
  providedIn: 'root',
})
export class SideTabService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addSideTab(sideTab: SideTab): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SideTab/Add`, sideTab);
  }
  editSideTab(sideTab: Omit<SideTab, 'pageId'>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/SideTab/Update`, sideTab);
  }
  getSideTabs(pageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/SideTab/GetPageSideTabs`, {
      params: { pageId },
    });
  }
  deleteSideTab(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/SideTab/Delete`, {
      params: { id },
    });
  }
}
