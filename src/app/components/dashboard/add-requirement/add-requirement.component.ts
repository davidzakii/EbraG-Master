import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-requirement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-requirement.component.html',
  styleUrl: './add-requirement.component.scss',
})
export class AddRequirementComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  jobId: string = '';
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getJobId();
  }
  getJobId() {
    const sub = this.activatedRoute.params.subscribe((param) => {
      this.jobId = param['id'];
    });
    this.subscription.add(sub);
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  addJobRequirment(form: any) {
    console.log(form.value);
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const sub = this.jobService
      .addJobRequirement({
        name: form.value.name,
        description: form.value.description,
        jobId: this.jobId,
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
