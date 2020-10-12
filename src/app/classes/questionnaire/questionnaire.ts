import { ThrowStmt } from '@angular/compiler';
import { QuestionnaireQuestion } from './questionnaire-question';

export class Questionnaire {
    id: number;
    title: string;
    status: boolean;
    creationDate: Date;
    companyId: number;
    userId: number;
    questionnaireQuestions: QuestionnaireQuestion[];

    constructor() {
        this.questionnaireQuestions = [];
    }
}