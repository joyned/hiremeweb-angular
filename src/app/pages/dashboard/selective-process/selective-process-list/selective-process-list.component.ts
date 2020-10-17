import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SelectiveProcess } from 'src/app/classes/selective-process/selective-process';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-selective-process-list',
  templateUrl: './selective-process-list.component.html',
  styleUrls: ['./selective-process-list.component.scss']
})
export class SelectiveProcessListComponent implements OnInit {

  public selectiveProcesses: SelectiveProcess[];

  constructor(private router: Router, private http: HttpClient) { }

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

}
