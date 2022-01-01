import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationComponent } from '././components/registration/registration.component';
import { LoginComponent } from '././components/login/login.component';
import { UserViewComponent } from '././components/user-view/user-view.component';
import { BlogViewComponent } from '././components/blog-view/blog-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user.service';
import { BlogService } from './services/blog.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserViewComponent,
    BlogViewComponent,
    DashboardComponent,
    CreateBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 3000,
      positionClass: 'toast-bottom-right'}),
  ],
  providers: [UserService, BlogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
