import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideTabService } from '../../../services/side-tab.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FaqSideTabWithFaqs } from '../../../ViewModels/faq-side-tab-with-faqs';
import { RouterLink } from '@angular/router';

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
  ngOnInit(): void {}
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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
