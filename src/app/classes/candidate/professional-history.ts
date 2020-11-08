export class ProfessionalHistory {
    id?: number;
    personId?: number;
    job: string;
    company: string;
    description: string;
    initialDate: Date;
    finalDate?: Date;
    currentJob: boolean;
}
