import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { Interceptor } from './services/token-interceptor/token-interceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HireMeButtonComponent } from './components/hire-me-button/hire-me-button.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterFullComponent } from './pages/register-full/register-full.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    JobsComponent,
    HireMeButtonComponent,
    RegisterComponent,
    HomeComponent,
    JobDetailsComponent,
    LoadingSpinnerComponent,
    RegisterComponent,
    RegisterFullComponent
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
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule,
    Interceptor,
    NgbModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
