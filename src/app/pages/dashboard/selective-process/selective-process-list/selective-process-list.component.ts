import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selective-process-list',
  templateUrl: './selective-process-list.component.html',
  styleUrls: ['./selective-process-list.component.scss']
})
export class SelectiveProcessListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public redirectToRegister() {
    this.router.navigateByUrl('/dashboard/selective-process');
  }

}
