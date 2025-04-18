import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideTabService } from '../../../services/side-tab.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SideTab } from '../../../models/side-tab';

@Component({
  selector: 'app-faqside-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faqside-tab.component.html',
  styleUrl: './faqside-tab.component.scss',
})
export class FAQSideTabComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  faqSideTabId: string = '';
  faqSideTab: Omit<SideTab, 'pageId'> = {
    id: '',
    title: '',
    content: '',
    order: 0,
  };
  constructor(
    private faqService: SideTabService,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private activateRouted: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getActivatedRoute();
    this.getFaqSideTab();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getActivatedRoute() {
    const sub = this.activateRouted.paramMap.subscribe({
      next: (param) => {
        this.faqSideTabId = param.get('id') || '';
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
    });
    this.subscription.add(sub);
  }
  getFaqSideTab() {
    const sub = this.faqService.getFAQsSideTabAll().subscribe({
      next: (res) => {
        if (res.isPass) {
          const faqSideTab = res.data.find(
            (faq) => faq.id === this.faqSideTabId
          );
          if (faqSideTab) {
            this.faqSideTab = faqSideTab;
          }
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  addFaqSideTab(form: any) {
    const sub = this.faqService
      .addFAQSideTab({
        title: form.value.title,
        content: form.value.content,
        order: form.value.order,
      })
      .subscribe({
        next: (response) => {
          if (response.isPass) {
            this.toastr.success(response.message);
            this.router.navigate(['/dashboard/faqs']);
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.message);
        },
      });
    this.subscription.add(sub);
  }
  updateFaqSideTab(updateFaqSideTabForm: any) {
    const sub = this.faqService
      .updateFAQSideTab({
        id: this.faqSideTabId,
        title: updateFaqSideTabForm.value.title,
        content: updateFaqSideTabForm.value.content,
        order: updateFaqSideTabForm.value.order,
      })
      .subscribe({
        next: (response) => {
          if (response.isPass) {
            this.toastr.success(response.message);
            this.router.navigate(['/dashboard/faqs']);
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
