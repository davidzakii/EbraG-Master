import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobCategory } from '../models/job-category';
import { Observable } from 'rxjs';
import { JobRequirement } from '../models/job-requirement';
import { Job } from '../models/job';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  addJobCategory(jobCategory: JobCategory): Observable<Response> {
    return this.http.post<Response>(`api/JobCategory/Add`, jobCategory);
  }
  editJobCategory(jobCategory: JobCategory): Observable<Response> {
    return this.http.put<Response>(`api/JobCategory/Update`, jobCategory);
  }
  getJobCategory(): Observable<Response> {
    return this.http.get<Response>(`api/JobCategory/All`);
  }
  deleteJobCategory(id: string): Observable<Response> {
    return this.http.delete<Response>(`api/JobCategory/Delete`, {
      params: { id },
    });
  }
  addJobRequirement(jobRequirement: JobRequirement): Observable<Response> {
    return this.http.post<Response>(`api/JobRequirment/Add`, jobRequirement);
  }
  editJobRequirment(jobRequirement: {
    id: string;
    name: string;
    description: string;
  }): Observable<Response> {
    return this.http.put<Response>(`api/JobRequirment/Update`, jobRequirement);
  }
  deleteJobRequirment(id: string): Observable<Response> {
    return this.http.delete<Response>(`api/JobRequirment/Delete`, {
      params: { id },
    });
  }
  addJob(job: Job): Observable<Response> {
    return this.http.post<Response>(`api/Job/Add`, job);
  }
  editJob(job: Omit<Job, 'requirments'>): Observable<Response> {
    return this.http.put<Response>(`api/Job/Update`, job);
  }
  getJobs(categoryId: string): Observable<Response> {
    return this.http.get<Response>(`api/Job/All`, {
      params: { categoryId },
    });
  }
  deleteJob(id: string): Observable<Response> {
    return this.http.delete<Response>(`api/Job/Delete`, {
      params: { id },
    });
  }
  applyJobApplicant(job:any):Observable<Response>{
    return this.http.post<Response>(`api/JobAppliction/Apply`, job);
  }
}
