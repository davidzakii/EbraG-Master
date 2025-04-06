import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { PageWithTabs } from '../../ViewModels/page-with-tabs';
import { PageService } from '../../services/page.service';
import { ToastrService } from 'ngx-toastr';
import { SideTab } from '../../models/side-tab';
import { LoaderService } from '../../services/loader.service';
import { ActivatedRoute } from '@angular/router';

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
  loading$!: Observable<boolean>;
  searchTerm = '';
  decodedToken: any;
  showAllContentMap: { [key: string]: boolean } = {};
  page: PageWithTabs = {
    description: '',
    name: '',
    sideTabs: [{ title: '', order: 0, content: '' }],
  };
  selectedTab: string = this.page.sideTabs[0].title;
  selectTab(tab: string) {
    this.selectedTab = tab;
    const element = document.getElementById('mainContainer');
    const offset = 96; // Height of the fixed nav
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }
  constructor(
    private darkModeService: DarkModeService,
    private pageService: PageService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
    this.getPage();
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    const sub2 = this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedTab = params['tab'];
    });
    this.subscription.add(sub);
    this.subscription.add(sub2);
  }
  getPage() {
    const sub = this.pageService.getPageByName('White Paper').subscribe({
      next: (response) => {
        if (response.isPass) {
          this.page = response.data;
          // const firstTab = this.page.sideTabs.find((tab) => tab.order === 1);
          // this.selectedTab = firstTab
          //   ? firstTab.title
          //   : this.page.sideTabs[0].title;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
