import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectiveProcess } from 'src/app/classes/selective-process/selective-process';
import { SelectiveProcessStep } from 'src/app/classes/selective-process/selective-process-step';

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

  constructor() {
    this.selectiveProcess = new SelectiveProcess();
    
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

  ngOnInit(): void {
  }


  public addStep(){
    this.step = new SelectiveProcessStep();
  }

}
