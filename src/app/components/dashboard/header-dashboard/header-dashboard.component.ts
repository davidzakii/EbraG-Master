import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.scss',
})
export class HeaderDashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  constructor(
    private darkModeSercice: DarkModeService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const sub = this.darkModeSercice.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });

    this.subscription.add(sub);
  }
  logOut() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
