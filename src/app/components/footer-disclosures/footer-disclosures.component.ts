import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-footer-disclosures',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './footer-disclosures.component.html',
  styleUrl: './footer-disclosures.component.scss',
})
export class FooterDisclosuresComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  searchTerm = '';
  decodedToken: any;
  selectedTab: string = 'trust-and-safety';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  constructor(private darkModeService: DarkModeService) {}
  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
