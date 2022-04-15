import { AuthGuard } from './../shared/guards/auth.guard';
import { AssignRoleComponent } from './member/assign-role/assign-role.component';
import { MemberComponent } from './member/member.component';
import { EditComponent } from './role/edit/edit.component';
import { RoleComponent } from './role/role.component';
import { DetailComponent } from './feedback/detail/detail.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { EditTagComponent } from './tags/edit-tag/edit-tag.component';
import { AddTagComponent } from './tags/add-tag/add-tag.component';
import { TagsComponent } from './tags/tags.component';
import { RegisterSucceededComponent } from './account/register-succeeded/register-succeeded.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { AddComponent } from './role/add/add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'member', canActivate: [AuthGuard], component: MemberComponent },
      {
        path: 'member/assign-role/:id',
        canActivate: [AuthGuard],
        component: AssignRoleComponent,
      },
      { path: 'role', canActivate: [AuthGuard], component: RoleComponent },
      { path: 'role/add', canActivate: [AuthGuard], component: AddComponent },
      {
        path: 'role/edit/:id',
        canActivate: [AuthGuard],
        component: EditComponent,
      },
      {
        path: 'feedbacks',
        canActivate: [AuthGuard],
        component: FeedbackComponent,
      },
      {
        path: 'feedback/detail/:id',
        canActivate: [AuthGuard],
        component: DetailComponent,
      },
      { path: 'pages', canActivate: [AuthGuard], component: PagesComponent },
      { path: 'tags', canActivate: [AuthGuard], component: TagsComponent },
      {
        path: 'add-page',
        canActivate: [AuthGuard],
        component: AddPageComponent,
      },
      {
        path: 'edit-page/:id',
        canActivate: [AuthGuard],
        component: EditPageComponent,
      },
      { path: 'add-tag', canActivate: [AuthGuard], component: AddTagComponent },
      {
        path: 'edit-tag/:id',
        canActivate: [AuthGuard],
        component: EditTagComponent,
      },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'register-succeeded', component: RegisterSucceededComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
