import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SelectiveProcess } from 'src/app/classes/selective-process/selective-process';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-selective-process-list',
  templateUrl: './selective-process-list.component.html',
  styleUrls: ['./selective-process-list.component.scss']
})
export class SelectiveProcessListComponent implements OnInit {

  public selectiveProcesses: SelectiveProcess[];

  constructor(private router: Router, private http: HttpClient, private alertMessageService: AlertMessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.listSelectiveProcesses();
  }

  public redirectToRegister() {
    this.router.navigateByUrl('/dashboard/selective-process');
  }

  public editSelectiveProcess(selectiveProcessId: number) {
    this.router.navigate(['/dashboard/selective-process/', { id: selectiveProcessId }]);
  }

  private listSelectiveProcesses() {
    this.http.get<any>(ApiUtil.getPath() + 'selective/process/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.selectiveProcesses = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public deleteSelectiveProcess(selectiveProcess: SelectiveProcess) {
    this.confirmService.confirm({
      header: selectiveProcess.title,
      message: 'Deseja realmente deletar o processo <b>' + selectiveProcess.title + '</b>?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.confirmDeleteSelectiveProcess(selectiveProcess.id)
    });
  }

  private confirmDeleteSelectiveProcess(selectiveProcessId: number) {
    this.http.delete<any>(ApiUtil.getPath() + 'selective/process/delete/' + selectiveProcessId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso.', 'Processo seletivo excluido com sucesso.');
          this.listSelectiveProcesses();
        }),
        catchError((httpErrorResponse) => {
          if (httpErrorResponse.error.payload === 'selective.process.not.deletable') {
            this.alertMessageService.errorMessage('Erro.', 'Falha ao excluir esse processo seletivo. Ele pode estar relacionado a uma vaga.');
          }
          return of();
        })
      ).subscribe();
  }

}
