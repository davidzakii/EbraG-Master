import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  pageId!: string;
  page: Page = {
    description: '',
    name: '',
  };
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute
  ) {}

  addPage(form: any) {
    const sub = this.pageService
      .addPage({ name: form.value.name, description: form.value.description })
      .subscribe({
        next: (response) => {
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

  editPage(editPageForm: any) {
    const sub = this.pageService
      .editPage({
        id: this.pageId,
        name: editPageForm.value.name,
        description: editPageForm.value.description,
      })
      .subscribe({
        next: (response) => {
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

  ngOnInit(): void {
    this.getPageId();
    if (this.pageId !== '') {
      const sub = this.pageService.getPages().subscribe({
        next: (response) => {
          if (response.isPass) {
            this.page =
              response.data.find((page: Page) => this.pageId === page.id) ||
              this.page;
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
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }
  getPageId() {
    const sub = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.pageId = param.get('id') || '';
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
