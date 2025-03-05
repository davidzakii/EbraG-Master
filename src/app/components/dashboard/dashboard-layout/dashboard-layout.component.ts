import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { HeaderDashboardComponent } from '../header-dashboard/header-dashboard.component';
import { AsideDashboardComponent } from '../aside-dashboard/aside-dashboard.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    CommonModule,
    HeaderDashboardComponent,
    AsideDashboardComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  constructor(
    private darkModeSercice: DarkModeService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    const sub = this.darkModeSercice.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    const sub1 = this.languageService.language$.subscribe((value) => {
      
      this.translate.use(value);
    });
    this.subscription.add(sub);
    this.subscription.add(sub1);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
