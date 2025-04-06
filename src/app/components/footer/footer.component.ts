import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  darkMode = false;
  showFooterLinks = false;
  currencyOptions = [
    { key: 'USD - US Dollar', value: 'usd' },
    { key: 'EUR - Euro', value: 'eur' },
    { key: 'GBP - British Pound', value: 'gbp' },
    { key: 'AED - UAE Dirham', value: 'aed' },
    { key: 'SAR - Saudi Riyal', value: 'sar' },
    { key: 'JPY - Japanese Yen', value: 'jpy' },
    { key: 'INR - Indian Rupee', value: 'inr' },
    { key: 'CNY - Chinese Yuan', value: 'cny' },
    { key: 'AUD - Australian Dollar', value: 'aud' },
    { key: 'CAD - Canadian Dollar', value: 'cad' },
  ];
  selectedOption: string = 'en';
  options: { value: string; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
  ];
  private subscription: Subscription = new Subscription();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private darkModeService: DarkModeService
  ) {}
  ngOnInit(): void {
    this.selectedOption = this.localStorageService.getLanguage();
    const sub = this.darkModeService.darkMode$.subscribe((value) => {
      this.darkMode = value;
    });
    this.subscription.add(sub);
  }
  changeLanguage() {
    this.localStorageService.setLanguage(this.selectedOption);
    this.translate.use(this.selectedOption);
    if (this.selectedOption === 'ar') {
      this.document.body.setAttribute('dir', 'rtl');
    } else {
      this.document.body.setAttribute('dir', 'ltr');
    }
  }
  scrollToMainContainer() {
    setTimeout(() => {
      const element = document.getElementById('mainContainer');
      const offset = 96; // Height of the fixed nav
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 0);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
