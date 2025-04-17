import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../services/jobs.service';
import { JobCategory } from '../../../models/job-category';

@Component({
  selector: 'app-update-job-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-job-category.component.html',
  styleUrl: './update-job-category.component.scss',
})
export class UpdateJobCategoryComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  jobCategoryId: string = '';
  jobCategory: JobCategory = {
    name: '',
    description: '',
  };
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getJobCategoryId();
    this.getJobCategory();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getJobCategoryId() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.jobCategoryId = params['id'];
    });
    this.subscription.add(sub);
  }
  getJobCategory() {
    const sub = this.jobService.getJobCategory().subscribe({
      next: (res) => {
        if (res.isPass) {
          this.jobCategory = res.data.find(
            (j: JobCategory) => j.id == this.jobCategoryId
          );
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  updateJobCategory(form: any) {
    const sub = this.jobService
      .editJobCategory({
        id: this.jobCategoryId,
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
