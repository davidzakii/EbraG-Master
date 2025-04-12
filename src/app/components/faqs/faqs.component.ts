import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { SideTabService } from '../../services/side-tab.service';
import { FAQ } from '../../models/faq';
import { ToastrService } from 'ngx-toastr';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { FaqSideTabWithFaqs } from '../../ViewModels/faq-side-tab-with-faqs';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  faqSideTabWithFaqs: FaqSideTabWithFaqs[] = [];
  selectedTab = '';
  searchTerm = '';
  darkMode: boolean = false;
  isModalOpen: boolean = false;
  showAllContentMap: { [key: string]: boolean } = {};

  activeIndex: number | null = null;

  constructor(
    private darkModeService: DarkModeService,
    private faqService: SideTabService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFAQsSideTabAll();
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  selectTab(tab: string) {
    this.activeIndex = null;
    this.selectedTab = tab;
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  getFAQsSideTabAll() {
    const sub = this.faqService.getFAQsSideTabAll().subscribe({
      next: (res) => {
        if (res.isPass) {
          this.faqSideTabWithFaqs = res.data;
          const firstOrderTab = res.data.find((tab) => tab.order === 1);
          this.selectedTab = firstOrderTab
            ? firstOrderTab.title
            : res.data[0].title;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
    this.subscription.add(sub);
  }
  sortFaqsOrder(faqs: FAQ[]): FAQ[] {
    return faqs.sort((a, b) => a.order - b.order);
  }
  sortFaqSideTabsOrder(sideTab: FaqSideTabWithFaqs[]): FaqSideTabWithFaqs[] {
    return sideTab.sort((a, b) => a.order - b.order);
  }
  toggleShowAllContent() {
    this.showAllContentMap[this.selectedTab] =
      !this.showAllContentMap[this.selectedTab];
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
