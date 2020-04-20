import { Component, OnInit, Injectable } from '@angular/core';
import { RegisterComponent } from '../../components/register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-full',
  templateUrl: './register-full.component.html',
  styleUrls: ['./register-full.component.scss']
})
export class RegisterFullComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
