import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideTabService } from '../../../services/side-tab.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FaqSideTabWithFaqs } from '../../../ViewModels/faq-side-tab-with-faqs';
import { RouterLink } from '@angular/router';
import { FAQ } from '../../../models/faq';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  faqs: FaqSideTabWithFaqs[] = [];
  constructor(
    private faqService: SideTabService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getFAQsSideTabAll();
  }
  getFAQsSideTabAll() {
    const sub = this.faqService.getFAQsSideTabAll().subscribe({
      next: (res) => {
        if (res.isPass) {
          this.faqs = res.data;
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
  sortFaqSidetabsOrder(
    sideTabWithFaqs: FaqSideTabWithFaqs[]
  ): FaqSideTabWithFaqs[] {
    return sideTabWithFaqs.sort((a, b) => a.order - b.order);
  }
  sortFaqs(faqs: FAQ[]): FAQ[] {
    return faqs.sort((a, b) => a.order - b.order);
  }
  deleteFaqSidetab(id: string) {
    const sub = this.toastr
      .warning(
        'Are you sure you want to delete this side tab?',
        'Confirm Delete',
        {
          disableTimeOut: false,
          closeButton: true,
          tapToDismiss: false,
          onActivateTick: true,
        }
      )
      .onTap.subscribe(() => {
        const sub = this.faqService.deleteFAQSideTab(id).subscribe({
          next: (res) => {
            if (res.isPass) {
              this.toastr.success(res.message);
              this.getFAQsSideTabAll();
            } else {
              this.toastr.error(res.message);
            }
          },
          error: (err) => {
            this.toastr.error(err.message);
          },
        });
        this.subscription.add(sub);
      });
    this.subscription.add(sub);
  }

  deleteFaq(id: string) {
    const sub = this.toastr
      .warning(
        'Are you sure you want to delete this side tab?',
        'Confirm Delete',
        {
          disableTimeOut: false,
          closeButton: true,
          tapToDismiss: false,
          onActivateTick: true,
        }
      )
      .onTap.subscribe(() => {
        const sub = this.faqService.deleteFAQ(id).subscribe({
          next: (res) => {
            if (res.isPass) {
              this.toastr.success(res.message);
              this.getFAQsSideTabAll();
            } else {
              this.toastr.error(res.message);
            }
          },
          error: (err) => {
            this.toastr.error(err.message);
          },
        });
        this.subscription.add(sub);
      });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
