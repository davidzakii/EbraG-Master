import { Component } from '@angular/core';
import { SideTabService } from '../../../services/side-tab.service';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideTab } from '../../../models/side-tab';

@Component({
  selector: 'app-add-side-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-side-tab.component.html',
  styleUrl: './add-side-tab.component.scss',
})
export class AddSideTabComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  sideTabs: SideTab[] = [];
  pageId: string = '';
  sideTabId: string = '';
  sideTab: SideTab = {
    pageId: '',
    title: '',
    content: '',
    order: 0,
  };
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private activateRouted: ActivatedRoute,
    private toastr: ToastrService,
    private sideTabService: SideTabService
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getActivatedRoute();
    const sub = this.sideTabService.getSideTabs(this.pageId).subscribe({
      next: (response) => {
        if (response.isPass) {
          this.sideTabs = response.data;
          if (this.sideTabId !== '') {
            this.sideTab = response.data.find(
              (tab: SideTab) => tab.id === this.sideTabId
            );
          }
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
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getActivatedRoute() {
    this.pageId = this.activateRouted.snapshot.paramMap.get('id') || '';
    const sub = this.activateRouted.paramMap.subscribe({
      next: (param) => {
        this.pageId = param.get('pageId') || this.pageId;
        this.sideTabId = param.get('sideTabId') || '';
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
    });
    this.subscription.add(sub);
  }
  addSideTab(form: any) {
    const sub = this.sideTabService
      .addSideTab({
        title: form.value.title,
        content: form.value.content,
        order: form.value.order,
        pageId: this.pageId,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isPass) {
            this.toastr.success(response.message);
            this.router.navigate(['/dashboard/pages']);
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
  updateSideTab(form: any) {
    const sub = this.sideTabService
      .editSideTab({
        title: form.value.title,
        content: form.value.content,
        order: form.value.order,
        id: this.sideTabId,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isPass) {
            this.toastr.success(response.message);
            this.router.navigate(['/dashboard/pages']);
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
