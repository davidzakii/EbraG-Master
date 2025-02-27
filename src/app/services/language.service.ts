import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageInitial = localStorage.getItem('language');
  private languageSubject = new BehaviorSubject<string>(
    this.languageInitial || ''
  );

  language$ = this.languageSubject.asObservable();

  /**
   * Set dark mode and persist in local storage.
   * @param value boolean value for dark mode.
   */
  setLanguage(value: string): void {
    localStorage.setItem('language', value);
    this.languageSubject.next(value);
  }

  getLanguage(): string {
    return this.languageSubject.value;
  }
}
