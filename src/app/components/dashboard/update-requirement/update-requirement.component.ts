import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../services/jobs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobRequirement } from '../../../models/job-requirement';

@Component({
  selector: 'app-update-requirement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-requirement.component.html',
  styleUrl: './update-requirement.component.scss',
})
export class UpdateRequirementComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  jobRequirmentId: string = '';
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDarkMode();
    this.getJobRequirmentId();
  }
  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  getJobRequirmentId() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.jobRequirmentId = params['id'];
    });
    this.subscription.add(sub);
  }
  updateJobRequirment(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const sub = this.jobService
      .editJobRequirment({
        id: this.jobRequirmentId,
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
