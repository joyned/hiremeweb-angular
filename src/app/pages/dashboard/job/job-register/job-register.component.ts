import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JobBenefit } from 'src/app/classes/job-benefit/job-benefit';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobRegisterComponent implements OnInit {

  public job: Job;
  public jobBenefits: JobBenefit[];
  public states: any[];
  public cities: any[];
  public selectiveProcesses: SelectItem[];
  public loading = false;

  constructor(private http: HttpClient, private alertMessage: AlertMessageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectiveProcesses = [];
    this.job = new Job();
    this.job.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getSelectiveProcesses();

    if (this.job.id === 0) {
      this.getStates();
      this.jobBenefits = [];
      this.job.salary = 0;
    } else {
      this.getDetails();
      this.getStates();
    }

  }

  public save() {
    if(this.validateFields()){
      this.loading = true;
      this.job.jobBenefits = this.jobBenefits;
  
      this.http.put<any>(ApiUtil.getPath() + 'job/', this.job, ApiUtil.buildOptions())
        .pipe(
          tap((data) => {
            if (this.job.id === 0) {
              this.alertMessage.successMessage('Sucesso', 'A vaga ' + this.job.title + ' foi cadastrada com sucesso!');
              this.job = new Job();
            } else {
              this.alertMessage.successMessage('Sucesso', 'A vaga ' + this.job.title + ' foi atualizada com sucesso!');
            }
            this.loading = false;
          }),
          catchError((httpResponse) => {
            this.alertMessage.errorMessage('Erro', 'Não foi possivel salvar a vaga ' + this.job.title + ' .');
            this.loading = false;
            return of();
          })
        ).subscribe();
    } else {
      this.alertMessage.errorMessage('Erro', 'Existem campos obrigatórios vazios.');
    }
  }

  public getDetails() {
    this.http.post<any>(ApiUtil.getPath() + 'job/detail/' + this.job.id, {}, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.job = data.payload;
          this.jobBenefits = this.job.jobBenefits;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  private getStates() {
    this.http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .pipe(
        tap((data: any) => {
          this.states = data.sort((state1, state2) => {
            if (state1.nome > state2.nome) {
              return 1;
            }
            if (state1.nome < state2.nome) {
              return -1;
            }
            return 0;
          });
          this.getCities(this.states[0].id);
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  public getCitiesOnChange(event) {
    this.cities = [];
    this.getCities(event.value.id);
    this.job.state = event.value.nome;
  }

  public changeCity(event) {
    this.job.city = event.value.nome;
  }

  private getCities(stateId: number) {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + stateId + '/distritos';
    this.http.get<any>(url)
      .pipe(
        tap((data: any) => {
          this.cities = data.sort((city1, city2) => {
            if (city1.nome > city2.nome) {
              return 1;
            }
            if (city1.nome < city2.nome) {
              return -1;
            }
            return 0;
          });
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  private getSelectiveProcesses(){
    this.http.get<any>(ApiUtil.getPath() + 'selective/process/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          data.payload.forEach(element => {
            const objItem = {
              label: element.title,
              value: element.id
            };

            this.selectiveProcesses.push(objItem);
          });
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  public addNewBenefit() {
    this.jobBenefits.push(new JobBenefit());
  }

  public removeBenefit(benefit: JobBenefit) {
    const index = this.jobBenefits.indexOf(benefit, 0);
    if (index > -1) {
      this.jobBenefits.splice(index, 1);
    }

  }

  public validateFields(){
    console.log(this.job.selectiveProcessId)
    return this.job.title && this.job.description && this.job.selectiveProcessId > 0 && this.job.salary > 0;
  }

}
