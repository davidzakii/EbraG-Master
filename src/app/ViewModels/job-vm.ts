import { JobRequirement } from '../models/job-requirement';

export interface JobVM {
  id?: string;
  categoryId: string;
  description: string;
  name: string;
  type: number;
  requirments: JobRequirement[];
}
