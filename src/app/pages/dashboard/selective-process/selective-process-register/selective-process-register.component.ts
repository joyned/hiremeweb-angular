import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SelectiveProcess } from 'src/app/classes/selective-process/selective-process';
import { SelectiveProcessStep } from 'src/app/classes/selective-process/selective-process-step';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
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

  private processId: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

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
    this.http.post<any>(ApiUtil.getPath() + 'selective/process/create', this.selectiveProcess, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public saveStep() {
    if (!this.selectiveProcess.steps) {
      this.selectiveProcess.steps = [];
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
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          data.payload.forEach(quest => {
            this.questionnaires.push({
              label: quest.title,
              value: quest.id
            });
          });
          // for (const index in data.payload) {
          //   this.questionnaires.push({
          //     label: data.payload[index].title,
          //     value: data.payload[index].id
          //   });
          // }
        }),
        catchError((httpErrorResponse) => {
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

}
