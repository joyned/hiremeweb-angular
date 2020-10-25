import { JobBenefit } from '../job-benefit/job-benefit';

export class Job {
    id?: number;
    title?: string;
    city?: string;
    state?: string;
    country?: string;
    salary?: number;
    description?: string;
    shortDescription?: string;
    jobBenefits?: JobBenefit[];
    company?: string;
    status?: boolean;
    selectiveProcessId: number;
}
