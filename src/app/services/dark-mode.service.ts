import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeInitial = localStorage.getItem('darkMode') === 'true';
  private darkModeSubject = new BehaviorSubject<boolean>(this.darkModeInitial);

  darkMode$ = this.darkModeSubject.asObservable();

  /**
   * Set dark mode and persist in local storage.
   * @param value boolean value for dark mode.
   */
  setDarkMode(value: boolean): void {
    localStorage.setItem('darkMode', value.toString());
    this.darkModeSubject.next(value);
  }

  getDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
