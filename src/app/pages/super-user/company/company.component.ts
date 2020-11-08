import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Company } from 'src/app/classes/company/Company';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public companies: Company[];

  public company: Company;

  constructor(private http: HttpClient, private alertMessageService: AlertMessageService,
    private confirmDialog: ConfirmationService) { }

  ngOnInit(): void {
    this.company = new Company();
    this.getCompanies();
  }

  private getCompanies() {
    this.http.get<any>(ApiUtil.getPath() + 'company/get', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.companies = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public save() {
    this.http.put<any>(ApiUtil.getPath() + 'company', this.company, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Os dados foram salvos com sucesso');
          this.getCompanies();
        }),
        catchError((httpErrorResponse) => {
          this.alertMessageService.errorMessage('Erro', 'Falha ao salvar os dados');
          return of();
        })
      ).subscribe();
    this.company = new Company();
  }


  public confirmDelete(company: Company){
    this.confirmDialog.confirm({
      header: company.name,
      message: `Deseja realmente excluir a empresa ${company.name}`,
      accept: () => this.delete(company),
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    });
  }


  private delete(company: Company) {
    this.http.delete<any>(ApiUtil.getPath() + 'company/delete/' + company.id, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', `A empresa ${company.name} foi deletada com sucesso`);
          this.getCompanies();
        }),
        catchError((httpErrorResponse) => {
          if (httpErrorResponse.error.payload === 'not.deletable') {
            this.alertMessageService.errorMessage('Erro', 'Existem usuários que estão vinculados a essa empresa.');
          } else {
            this.alertMessageService.errorMessage('Erro', `Falha ao deletar a empresa ${company.name}. Tente novamente`);
          }
          return of();
        })
      ).subscribe();
  }

  public edit(companyToEdit: Company) {
    this.company = Object.assign({}, companyToEdit);
    console.log(this.company);
  }

}
