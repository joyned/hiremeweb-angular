import { SelectiveProcessStep } from './selective-process-step';

export class SelectiveProcess {
    id: number;
    title: string;
    companyId: number;
    userId: number;
    status: boolean;
    steps: SelectiveProcessStep[];

    constructor() {
    }
}
