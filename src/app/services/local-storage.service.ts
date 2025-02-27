import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private darkModeKey = 'darkMode';
  private languageKey = 'language';

  getDarkMode(): boolean {
    return localStorage.getItem(this.darkModeKey) === 'true';
  }
  /**
   * Stores the dark mode preference.
   * @param value - A boolean indicating whether dark mode is enabled.
   */
  setDarkMode(value: boolean): void {
    localStorage.setItem(this.darkModeKey, value.toString());
  }

  getLanguage(): string {
    return localStorage.getItem(this.languageKey) || 'en';
  }

  /**
   * Stores the selected language.
   * @param lang - The language code (e.g., 'en' or 'ar').
   */
  setLanguage(lang: string): void {
    localStorage.setItem(this.languageKey, lang);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
