import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { RegisterFullComponent } from './pages/register-full/register-full.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registerfull', component: RegisterFullComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'config', component: ConfigurationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'applied-jobs', component: AppliedJobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
