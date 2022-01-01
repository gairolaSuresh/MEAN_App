import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '././components/registration/registration.component';
import { LoginComponent } from '././components/login/login.component';
import { UserViewComponent } from '././components/user-view/user-view.component';
import { BlogViewComponent } from '././components/blog-view/blog-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path : 'register',component:RegistrationComponent},
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-post',
        component: CreateBlogComponent,
      },
      {
        path: 'user-view',
        component: UserViewComponent,
      },
      {
        path: 'blog-view',
        component: BlogViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
