import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideTabService } from '../../../services/side-tab.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute } from '@angular/router';

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
  sideTabId: string = '';
  constructor(
    private faqService: SideTabService,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private activateRouted: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
  }
  getFAQsSideTabAll() {}
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  // getActivatedRoute() {
  //   const sub = this.activateRouted.paramMap.subscribe({
  //     next: (param) => {
  //       this.sideTabId = param.get('id') || '';
  //     },
  //     error: (err) => {
  //       this.toastr.error(JSON.stringify(err));
  //     },
  //   });
  //   this.subscription.add(sub);
  // }
  addFaqSideTab(form:any) {
    const sub = this.faqService
    .addFAQSideTab({
      title: form.value.title,
      content: form.value.content,
      order: form.value.order,
    })
    .subscribe({
      next: (response) => {
        console.log(response);
        if (response.isPass) {
          this.toastr.success(response.message);
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
