import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserManualRegisterComponent } from './pages/user-manual-register/user-manual-register.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs-detail/:job_id/:show_button', component: JobDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'page-register', component: PageRegisterComponent, canActivate: [AuthGuard] },
  { path: 'manual-register', component: UserManualRegisterComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
