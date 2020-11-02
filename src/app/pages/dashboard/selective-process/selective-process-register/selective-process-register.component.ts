import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SelectiveProcess } from 'src/app/classes/selective-process/selective-process';
import { SelectiveProcessStep } from 'src/app/classes/selective-process/selective-process-step';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { idText } from 'typescript';

@Component({
  selector: 'app-selective-process-register',
  templateUrl: './selective-process-register.component.html',
  styleUrls: ['./selective-process-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectiveProcessRegisterComponent implements OnInit {

  public selectiveProcess: SelectiveProcess;
  public step: SelectiveProcessStep;
  public stepTypes: SelectItem[];
  public questionnaires: SelectItem[];
  public loading = false;

  private processId: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private alertMessageService: AlertMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.processId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.questionnaires = new Array();
    this.selectiveProcess = new SelectiveProcess();

    if (this.processId > 0 && this.processId) {
      this.getSelectiveProcess();
    }

    this.stepTypes = [
      {
        label: 'Questionário',
        value: 'Q'
      },
      {
        label: 'Entrevista por video',
        value: 'E'
      },
      {
        label: 'Desafio',
        value: 'D'
      }
    ];
  }

  private getSelectiveProcess() {
    this.http.get<any>(ApiUtil.getPath() + 'selective/process/get/' + this.processId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.selectiveProcess = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public saveSelectiveProcess() {
    this.loading = true;
    this.http.put<any>(ApiUtil.getPath() + 'selective/process', this.selectiveProcess, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso.', 'O processo seletivo foi salvo com sucesso!');
          this.selectiveProcess.id = data.payload.seletiveProcessId;
          this.router.navigate(['/dashboard/selective-process/', { id: data.payload.seletiveProcessId }]);
          this.loading = false;
        }),
        catchError((httpErrorResponse) => {
          this.alertMessageService.errorMessage('Erro.', 'Ocorreu um erro ao salvar. Tente novamente.');
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public saveStep() {
    if (!this.selectiveProcess.steps) {
      this.selectiveProcess.steps = [];
    }

    if (this.selectiveProcess.id !== 0) {
      const index = this.selectiveProcess.steps.indexOf(this.step, 0);
      if (index > -1) {
        this.selectiveProcess.steps.splice(index, 1);
      }
    }

    this.selectiveProcess.steps.push(this.step);
    this.step = undefined;
  }

  public addStep() {
    this.step = new SelectiveProcessStep();
  }


  public changeStepType(event) {
    if (event.value === 'Q') {
      this.getQuestionnaires();
    }
  }

  public getQuestionnaires() {
    this.loading = true;
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          data.payload.forEach(quest => {
            this.questionnaires.push({
              label: quest.title,
              value: quest.id
            });
          });
          this.loading = false;
        }),
        catchError((httpErrorResponse) => {
          this.loading = false;
          return of();
        })
      ).subscribe();
  }


  public getQuestionnaireNameById(id: number) {
    if (this.questionnaires.length === 0) {
      this.getQuestionnaires();
    }
    let questionnaireName = '';
    this.questionnaires.forEach(element => {
      if (element.value === id) {
        questionnaireName = element.label;
      }
    });
    return questionnaireName;
  }

  public editStep(step: SelectiveProcessStep) {
    this.step = step;
  }

}
