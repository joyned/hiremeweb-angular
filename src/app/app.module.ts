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
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { Interceptor } from './services/token-interceptor/token-interceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HireMeButtonComponent } from './components/hire-me-button/hire-me-button.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { HomeComponent } from './pages/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HireMeTitleComponent } from './components/hire-me-title/hire-me-title.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { MatSelectModule } from '@angular/material/select';
import { UserManualRegisterComponent } from './pages/user-manual-register/user-manual-register.component';
import { NgxMaskModule } from 'ngx-mask'
import { RegisterComponent } from './pages/register/register.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesComponent } from './pages/messages/messages.component'
import { ClientSocket } from './services/socket/client.socket';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    JobsComponent,
    HireMeButtonComponent,
    HomeComponent,
    JobDetailsComponent,
    LoadingSpinnerComponent,
    RegisterComponent,
    InputTextComponent,
    ConfigurationComponent,
    ImageUploadComponent,
    InputPasswordComponent,
    AppliedJobsComponent,
    ErrorDialogComponent,
    HireMeTitleComponent,
    PageRegisterComponent,
    UserManualRegisterComponent,
    MessagesComponent,
    MenuBarComponent
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
    NgbModule,
    FontAwesomeModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgbModule
  ],
  providers: [AuthGuard, ClientSocket],
  bootstrap: [AppComponent]
})
export class AppModule { }
