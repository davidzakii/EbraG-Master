import { Injectable } from '@angular/core';
import { environment } from '../../env/environment.pro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SideTab } from '../models/side-tab';
import { FAQ } from '../models/faq';
import { FaqSideTabWithFaqs } from '../ViewModels/faq-side-tab-with-faqs';

@Injectable({
  providedIn: 'root',
})
export class SideTabService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addSideTab(sideTab: SideTab): Observable<any> {
    return this.http.post<any>(`api/SideTab/Add`, sideTab);
  }
  editSideTab(sideTab: Omit<SideTab, 'pageId'>): Observable<any> {
    return this.http.put<any>(`api/SideTab/Update`, sideTab);
  }
  getSideTabs(pageId: string): Observable<any> {
    return this.http.get(`api/SideTab/GetPageSideTabs`, {
      params: { pageId },
    });
  }
  deleteSideTab(id: string): Observable<any> {
    return this.http.delete(`api/SideTab/Delete`, {
      params: { id },
    });
  }
  addFAQSideTab(sideTab: Omit<SideTab, 'pageId'>): Observable<any> {
    return this.http.post<any>(`api/FAQSideTab/Add`, sideTab);
  }
  updateFAQSideTab(sideTab: Omit<SideTab, 'pageId'>): Observable<any> {
    return this.http.put<any>(`api/FAQSideTab/Update`, sideTab);
  }
  deleteFAQSideTab(id: string): Observable<any> {
    return this.http.delete<any>(`api/FAQSideTab/Delete`, { params: { id } });
  }
  addFAQ(faq: FAQ): Observable<any> {
    return this.http.post<any>(`api/FAQ/Add`, faq);
  }
  updateFAQ(faq: Omit<FAQ, 'faqSideTabId'>): Observable<any> {
    if (!faq.id) {
      throw new Error('FAQ id is required for update.');
    }
    return this.http.put<any>(`api/FAQ/Update`, faq, {
      params: { id: faq.id },
    });
  }
  deleteFAQ(id: string): Observable<any> {
    return this.http.delete<any>(`api/FAQ/Delete`, { params: { id } });
  }
  getFAQsSideTabAll(): Observable<{
    data: FaqSideTabWithFaqs[];
    isPass: boolean;
    message: string;
  }> {
    return this.http.get<{
      data: FaqSideTabWithFaqs[];
      isPass: boolean;
      message: string;
    }>(`api/FAQSideTab/All`);
  }
}
