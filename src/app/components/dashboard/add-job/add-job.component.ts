import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../services/dark-mode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss',
})
export class AddJobComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  jobCategoryId: string = '';
  jobForm: FormGroup;
  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.jobForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      requirments: this.fb.array(
        [
          this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
          }),
        ],
        Validators.required
      ),
      categoryId: [''],
    });
  }
  get name() {
    return this.jobForm.get('name');
  }
  get description() {
    return this.jobForm.get('description');
  }
  get type() {
    return this.jobForm.get('type');
  }
  get categoryId() {
    return this.jobForm.get('categoryId');
  }
  get requirment() {
    return this.jobForm.get('requirments') as FormArray;
  }

  addRequirment() {
    this.requirment.push(
      this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      })
    );
  }
  deleteRequirment() {
    this.requirment.removeAt(this.requirment.length - 1);
  }
  ngOnInit(): void {
    this.getDarkMode();
    this.getJobCategoryId();
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
  addJob(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        control?.markAsTouched({ onlySelf: true });

        if (control instanceof FormArray) {
          control.controls.forEach((group: any) => {
            Object.values(group.controls).forEach((ctrl: any) => {
              ctrl.markAsTouched({ onlySelf: true });
            });
          });
        }
      });
      return;
    }
    this.jobForm.value.categoryId = this.jobCategoryId;
    const job = this.jobForm.value as Job;
    const sub = this.jobService.addJob(job).subscribe({
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
