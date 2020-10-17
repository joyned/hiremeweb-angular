import { QuestionnaireQuestionOption } from './questionnaire-question-option';

export class QuestionnaireQuestion {
   id: number;
   questionnaieId: number;
   questionTitle: string;
   questionHelp: string;
   answerType: string;
   answerTime: number;
   questionnaireQuestionOption: QuestionnaireQuestionOption[];

   constructor() {
      this.questionnaireQuestionOption = [];
      this.answerType = 'T';
   }
}
