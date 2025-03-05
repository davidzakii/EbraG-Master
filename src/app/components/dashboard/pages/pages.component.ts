import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  pages: Page[] = [];
  constructor(
    private pageService: PageService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    const sub = this.pageService.getPages().subscribe({
      next: (response) => {
        if (response.isPass) {
          this.pages = response.data;
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

  deletePage(id: string) {
    this.toastr
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
        const sub = this.pageService.deletePage(id).subscribe({
          next: (response) => {
            if (response.isPass) {
              this.toastr.success(response.message);
              this.getPages();
            } else {
              this.toastr.error(response.message);
            }
          },
          error: (err) => {
            this.toastr.error(err.message);
          },
        });
        this.subscription.add(sub);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
