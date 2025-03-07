import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { PageService } from '../../services/page.service';
import { ToastrService } from 'ngx-toastr';
import { PageWithTabs } from '../../ViewModels/page-with-tabs';
import { SideTab } from '../../models/side-tab';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  page: PageWithTabs = {
    description: '',
    name: '',
    sideTabs: [{ title: '', order: 0, content: '' }],
  };
  selectedTab: string = this.page.sideTabs[0].title;
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  constructor(
    private darkModeService: DarkModeService,
    private pageService: PageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
    this.getPage();
  }
  getPage() {
    const sub = this.pageService.getPageByName('Ebraj').subscribe({
      next: (response) => {
        if (response.isPass) {
          this.page = response.data;
          const firstTab = this.page.sideTabs.find((tab) => tab.order === 1);
          this.selectedTab = firstTab
            ? firstTab.title
            : this.page.sideTabs[0].title;
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  sortPageBySidetabsOrder(
    sideTabs: Omit<SideTab, 'pageId'>[]
  ): Omit<SideTab, 'pageId'>[] {
    return sideTabs.sort((a, b) => a.order - b.order);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
