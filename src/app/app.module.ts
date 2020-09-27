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
import { LoginComponent } from './pages/login/login.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserManualRegisterComponent } from './pages/user-manual-register/user-manual-register.component';
import { ClientSocket } from './services/socket/client.socket';
import { Interceptor } from './services/token-interceptor/token-interceptor.service';
import { AlertMessageComponent } from './components/alert-message/alert-message.component'
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

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
import { JobRegisterComponent } from './pages/job-register/job-register.component';

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
    JobRegisterComponent
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
    CarouselModule
  ],
  providers: [AuthGuard, ClientSocket],
  bootstrap: [AppComponent]
})
export class AppModule { }
