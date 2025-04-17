import { Component } from '@angular/core';
import { DarkModeService } from '../../../services/dark-mode.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-add-job-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job-category.component.html',
  styleUrl: './add-job-category.component.scss',
})
export class AddJobCategoryComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobsService
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  addJobCategory(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const sub = this.jobService
      .addJobCategory({
        name: form.value.name,
        description: form.value.description,
      })
      .subscribe({
        next: (res) => {
          if (res.isPass) {
            this.toastr.success(res.message);
            this.router.navigate(['/dashboard/careers']);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
