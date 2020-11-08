export class SelectiveProcessStep {
    id: number;
    stepTitle: string;
    stepDescription: string;
    stepType: string;
    questionnaireId: number;
    selectiveProcessId: number;
    order: number;

    constructor() {
        this.stepType = 'E';
    }
}
