import { JobBenefit } from '../job-benefit/job-benefit';

export class Job {
    id?: number;
    title?: string;
    city?: string;
    state?: string;
    country?: string;
    salary?: string;
    description?: string;
    shortDescription?: string;
    idArea?: number;
    idJobLevel?: number;
    jobBenefits?: JobBenefit[];
    company?: string;
    status?: boolean;
}
