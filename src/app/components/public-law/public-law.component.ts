import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-public-law',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './public-law.component.html',
  styleUrl: './public-law.component.scss',
})
export class PublicLawComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  selectedTab: string = 'rules';
  loadingMore: boolean = false;
  selectTab(tap: string) {
    this.selectedTab = tap;
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
