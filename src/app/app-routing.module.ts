import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { LoginComponent } from './components/login/login.component';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component'
import { AuthGuard } from './guard/auth-guard.guard';
import { ResolveService } from './services/resolve/resolve.service';
import { UserManualRegisterComponent } from './pages/user-manual-register/user-manual-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { MessagesComponent } from './pages/messages/messages.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'applied-jobs', component: AppliedJobsComponent, canActivate: [AuthGuard]},
  {path: 'config', component: ConfigurationComponent, canActivate: [AuthGuard]},
  {path: 'page-register', component: PageRegisterComponent, canActivate: [AuthGuard]},
  {path: 'manual-register', component: UserManualRegisterComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
