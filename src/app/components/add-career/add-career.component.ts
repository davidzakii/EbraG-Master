import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-career',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-career.component.html',
  styleUrl: './add-career.component.scss',
})
export class AddCareerComponent {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  resumeFiles: File[] = [];
  personaLImg: File | null = null;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  preferredJobType: number = 0;
  jobId: string = '';

  constructor(
    private darkModeService: DarkModeService,
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDarkMode();
    this.getJobId();
  }

  getJobId() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.jobId = params['id'];
    });
    this.subscription.add(sub);
  }

  getDarkMode() {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }

  triggerResumeInput(): void {
    const input = document.getElementById('resumeInput') as HTMLInputElement;
    input?.click();
  }

  triggerImageInput(): void {
    const input = document.getElementById('imgInput') as HTMLInputElement;
    input?.click();
  }

  onResumeSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.resumeFiles = Array.from(target.files);
    }
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.personaLImg = target.files[0];
    }
  }

  submitApplication(): void {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.phoneNumber ||
      !this.resumeFiles.length
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('JobId', this.jobId);
    formData.append('ApplicantFirstName', this.firstName);
    formData.append('ApplicantLastName', this.lastName);
    formData.append('ApplicantEmailAddress', this.email);
    formData.append('ApplicantPhoneNumber', this.phoneNumber);
    formData.append('PreferedJobType', this.preferredJobType.toString());

    this.resumeFiles.forEach((file) => {
      formData.append('ResumeFile', file);
    });

    if (this.personaLImg) {
      formData.append('PersonaLImg', this.personaLImg);
    }
    const sub = this.jobService.applyJobApplicant(formData).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
