import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { JobRegisterComponent } from './pages/dashboard/job/job-register/job-register.component';
import { MainDashboardComponent } from './pages/dashboard/main-dashboard/main-dashboard.component';
import { QuestionnaireRegisterComponent } from './pages/dashboard/questionnaire/questionnaire-register/questionnaire-register.component';
import { QuestionnaireViewComponent } from './pages/dashboard/questionnaire/questionnaire-view/questionnaire-view.component';
// tslint:disable-next-line:max-line-length
import { SelectiveProcessRegisterComponent } from './pages/dashboard/selective-process/selective-process-register/selective-process-register.component';
import { HomeComponent } from './pages/home/home.component';
import { AppliedJobsComponent } from './pages/job/applied-jobs/applied-jobs.component';
import { JobDetailsComponent } from './pages/job/job-details/job-details.component';
import { JobsComponent } from './pages/job/jobs/jobs.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PageRegisterComponent } from './pages/system-config/page-register/page-register.component';
import { UserManualRegisterComponent } from './pages/system-config/user-manual-register/user-manual-register.component';
import { ConfigurationComponent } from './pages/user/configuration/configuration.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs-detail/:id', component: JobDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'page-register', component: PageRegisterComponent, canActivate: [AuthGuard] },
  { path: 'manual-register', component: UserManualRegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: MainDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/job', component: JobRegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/questionnaire', component: QuestionnaireRegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/questionnaire/view', component: QuestionnaireViewComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/selective-process', component: SelectiveProcessRegisterComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
