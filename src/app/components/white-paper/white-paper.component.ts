import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { PageWithTabs } from '../../ViewModels/page-with-tabs';
import { PageService } from '../../services/page.service';
import { ToastrService } from 'ngx-toastr';
import { SideTab } from '../../models/side-tab';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-white-paper',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './white-paper.component.html',
  styleUrl: './white-paper.component.scss',
})
export class WhitePaperComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  isModalOpen: boolean = false;
  loading$!: Observable<boolean>;
  showAllContentMap: { [key: string]: boolean } = {};
  page: PageWithTabs = {
    description: '',
    name: '',
    sideTabs: [{ title: '', order: 0, content: '' }],
  };
  selectedTab: string = this.page.sideTabs[0].title;
  selectTab(tap: string) {
    this.selectedTab = tap;
  }

  constructor(
    private darkModeService: DarkModeService,
    private pageService: PageService,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
    this.getPage();
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }

  getPage() {
    const sub = this.pageService.getPageByName('White Paper').subscribe({
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
    this.subscription.add(sub);
  }
  sortPageBySidetabsOrder(
    sideTabs: Omit<SideTab, 'pageId'>[]
  ): Omit<SideTab, 'pageId'>[] {
    return sideTabs.sort((a, b) => a.order - b.order);
  }

  toggleShowAllContent() {
    this.showAllContentMap[this.selectedTab] =
      !this.showAllContentMap[this.selectedTab];
  }
  closeModal() {
    this.isModalOpen = false;
  }
  openModal() {
    this.isModalOpen = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
