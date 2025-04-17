import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../services/jobs.service';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-update-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-job.component.html',
  styleUrl: './update-job.component.scss',
})
export class UpdateJobComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  jobCategoryId: string = '';
  jobId: string = '';
  job: Job = {
    categoryId: '',
    name: '',
    description: '',
    type: 0,
    requirments: [
      {
        name: '',
        description: '',
      },
    ],
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
    this.getJob();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getJobCategoryId() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.jobCategoryId = params['categoryId'];
      this.jobId = params['id'];
    });
    this.subscription.add(sub);
  }
  getJob() {
    const sub = this.jobService.getJobs(this.jobCategoryId).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.job = res.data.find((j: Job) => j.id === this.jobId);
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
  updateJob(form: any) {
    const sub = this.jobService
      .editJob({
        id: this.jobId,
        categoryId: this.jobCategoryId,
        name: form.value.name,
        description: form.value.description,
        type: form.value.type,
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
