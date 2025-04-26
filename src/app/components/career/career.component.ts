import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobCategory } from '../../models/job-category';
import { JobsService } from '../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../../models/job';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
})
export class CareerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  searchTerm: string = '';
  showContent: boolean = false;
  showJob: boolean = false;
  selectedJob: string = '';
  selectJob(job: string) {
    this.selectedJob = this.selectedJob === job ? '' : job;
  }
  jobCategories: JobCategory[] = [];
  jobs: Job[] = [];
  constructor(
    private darkModeService: DarkModeService,
    private jobService: JobsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getJobCategory();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getJobCategory() {
    const sub = this.jobService.getJobCategory().subscribe({
      next: (res) => {
        if (res.isPass) {
          this.jobCategories = res.data;
          if (this.jobCategories.length > 0) this.showJobs(res.data[0].id);
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
  showJobs(categoryId: string) {
    const sub = this.jobService.getJobs(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isPass) {
          this.jobs = res.data;
          this.toastr.success(res.message);
          this.getJobCategory();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => this.toastr.error(err.message),
    });
    this.subscription.add(sub);
    // this.showJob = !this.showJob;
  }
  showAllContent() {
    this.showContent = !this.showContent;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
