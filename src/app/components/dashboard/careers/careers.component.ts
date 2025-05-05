import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsService } from '../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { JobCategory } from '../../../models/job-category';
import { JobVM } from '../../../ViewModels/job-vm';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  showJob: boolean = false;
  jobCategories: JobCategory[] = [];
  jobs: JobVM[] = [];

  constructor(private jobService: JobsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getJobCategory();
  }

  getJobCategory() {
    const sub = this.jobService.getJobCategory().subscribe({
      next: (res) => {
        if (res.isPass) {
          this.jobCategories = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });

    this.subscription.add(sub);
  }

  getJobs(categoryId: string) {
    const sub = this.jobService.getJobs(categoryId).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.jobs = res.data;
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });

    this.subscription.add(sub);
  }
  hideJobs() {
    this.jobs = [];
  }
  deleteJobCategory(id: string) {
    const sub = this.jobService.deleteJobCategory(id).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.toastr.success(res.message);
          this.getJobCategory();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });

    this.subscription.add(sub);
  }

  deleteJob(id: string) {
    const sub = this.jobService.deleteJob(id).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.toastr.success(res.message);
          this.getJobs(id);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });

    this.subscription.add(sub);
  }

  deleteRequirment(id: string) {
    const sub = this.jobService.deleteJobRequirment(id).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.toastr.success(res.message);
          this.getJobCategory();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
