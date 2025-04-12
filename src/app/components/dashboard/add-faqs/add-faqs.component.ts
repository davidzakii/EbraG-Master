import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SideTabService } from '../../../services/side-tab.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FAQ } from '../../../models/faq';

@Component({
  selector: 'app-add-faqs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-faqs.component.html',
  styleUrl: './add-faqs.component.scss',
})
export class AddFaqsComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  faqSideTabId: string = '';
  faqId: string = '';
  faq: FAQ = {
    id: '',
    question: '',
    answer: '',
    order: 0,
    faqSideTabId: '',
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
    this.getFAQ();
  }
  getFAQ() {
    const sub = this.faqService.getFAQsSideTabAll().subscribe({
      next: (res) => {
        if (res.isPass) {
          const faqs = res.data.flatMap((sidetab) => sidetab.faQs);
          const faq = faqs.find((f) => f.id === this.faqId);
          if (faq) this.faq = faq;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
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
        this.faqSideTabId = param.get('faqSideTabId') || '';
        this.faqId = param.get('faqId') || '';
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
    });
    this.subscription.add(sub);
  }
  addFaq(form: any) {
    const sub = this.faqService
      .addFAQ({
        question: form.value.question,
        answer: form.value.answer,
        order: form.value.order,
        faqSideTabId: this.faqSideTabId,
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
  updateFaq(form: any) {
    const sub = this.faqService
      .updateFAQ({
        question: form.value.question,
        answer: form.value.answer,
        order: form.value.order,
        id: this.faqId,
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
