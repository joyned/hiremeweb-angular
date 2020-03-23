import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HireMeButtonComponent } from './hire-me-button/hire-me-button.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    JobsComponent,
    HireMeButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
