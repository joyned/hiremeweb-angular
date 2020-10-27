import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HireMeTitleComponent } from './components/hire-me-title/hire-me-title.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { AppliedJobsComponent } from './pages/job/applied-jobs/applied-jobs.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PageRegisterComponent } from './pages/system-config/page-register/page-register.component';
import { ClientSocket } from './services/socket/client.socket';
import { Interceptor } from './services/token-interceptor/token-interceptor.service';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { JobDetailsComponent } from './pages/job/job-details/job-details.component';
import { JobsComponent } from './pages/job/jobs/jobs.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { ConfigurationComponent } from './pages/user/configuration/configuration.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { UserManualRegisterComponent } from './pages/system-config/user-manual-register/user-manual-register.component';
import { MainDashboardComponent } from './pages/dashboard/main-dashboard/main-dashboard.component';
import { QuestionnaireListComponent } from './pages/dashboard/questionnaire/questionnaire-list/questionnaire-list.component';
import { QuestionnaireRegisterComponent } from './pages/dashboard/questionnaire/questionnaire-register/questionnaire-register.component';
import { JobRegisterComponent } from './pages/dashboard/job/job-register/job-register.component';
import { JobCandidatesComponent } from './pages/dashboard/job/job-candidates/job-candidates.component';
import { JobListComponent } from './pages/dashboard/job/job-list/job-list.component';
import { SelectiveProcessListComponent } from './pages/dashboard/selective-process/selective-process-list/selective-process-list.component';
// tslint:disable-next-line:max-line-length
import { SelectiveProcessRegisterComponent } from './pages/dashboard/selective-process/selective-process-register/selective-process-register.component';
import { QuestionnaireViewComponent } from './pages/dashboard/questionnaire/questionnaire-view/questionnaire-view.component';

/* PrimeNG Modules */
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AccordionModule } from 'primeng/accordion';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MyApplicationsComponent } from './pages/job/my-applications/my-applications.component';
import { MyApplicationsDetailsComponent } from './pages/job/my-applications-details/my-applications-details.component';
import { JobCandidateProcessComponent } from './pages/dashboard/job/job-candidate-process/job-candidate-process.component';
import { QuestionnaireAnswerComponent } from './pages/questionnaire/questionnaire-answer/questionnaire-answer.component';
import { JobCandidateAnswerComponent } from './pages/dashboard/job/job-candidate-answer/job-candidate-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JobsComponent,
    HomeComponent,
    JobDetailsComponent,
    LoadingSpinnerComponent,
    RegisterComponent,
    ConfigurationComponent,
    ImageUploadComponent,
    AppliedJobsComponent,
    ErrorDialogComponent,
    HireMeTitleComponent,
    PageRegisterComponent,
    UserManualRegisterComponent,
    MessagesComponent,
    MenuBarComponent,
    AlertMessageComponent,
    ChangePasswordComponent,
    FooterBarComponent,
    AboutUsComponent,
    MainDashboardComponent,
    JobRegisterComponent,
    JobCandidatesComponent,
    QuestionnaireRegisterComponent,
    QuestionnaireListComponent,
    JobListComponent,
    SelectiveProcessListComponent,
    SelectiveProcessRegisterComponent,
    QuestionnaireViewComponent,
    MyApplicationsComponent,
    MyApplicationsDetailsComponent,
    JobCandidateProcessComponent,
    QuestionnaireAnswerComponent,
    JobCandidateAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    Interceptor,
    LayoutModule,
    NgxMaskModule.forRoot(),
    ButtonModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    SlideMenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CalendarModule,
    InputMaskModule,
    TableModule,
    SidebarModule,
    CheckboxModule,
    TabViewModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    TieredMenuModule,
    CarouselModule,
    ChartModule,
    InputNumberModule,
    DynamicDialogModule,
    AccordionModule,
    EditorModule,
    RadioButtonModule
  ],
  providers: [AuthGuard, ClientSocket],
  bootstrap: [AppComponent]
})
export class AppModule { }
