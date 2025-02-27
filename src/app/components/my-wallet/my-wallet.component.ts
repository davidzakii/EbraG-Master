import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-my-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.scss',
})
export class MyWalletComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  loadingMore: boolean = false;
  selectedTab: string = 'accounts';
  transactionsTab: string = 'pay';
  selectTransactionsTab(tap: string) {
    this.transactionsTab = tap;
  }
  constructor(private darkModeSrrvice: DarkModeService) {}
  ngOnInit(): void {
    const sub = this.darkModeSrrvice.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
