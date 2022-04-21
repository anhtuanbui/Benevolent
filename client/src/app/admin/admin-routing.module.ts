import { AdminGuard } from './../shared/guards/admin.guard';
import { ModOrAdminGuard } from './../shared/guards/modOrAdmin.guard';
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
      { path: 'member', canActivate: [AuthGuard, AdminGuard], component: MemberComponent },
      {
        path: 'member/assign-role/:id',
        canActivate: [AuthGuard, AdminGuard],
        component: AssignRoleComponent,
      },
      { path: 'role', canActivate: [AuthGuard, AdminGuard], component: RoleComponent },
      { path: 'role/add', canActivate: [AuthGuard, AdminGuard], component: AddComponent },
      {
        path: 'role/edit/:id',
        canActivate: [AuthGuard, AdminGuard],
        component: EditComponent,
      },
      {
        path: 'feedbacks',
        canActivate: [AuthGuard, ModOrAdminGuard],
        component: FeedbackComponent,
      },
      {
        path: 'feedback/detail/:id',
        canActivate: [AuthGuard, ModOrAdminGuard],
        component: DetailComponent,
      },
      { path: 'pages', canActivate: [AuthGuard, ModOrAdminGuard], component: PagesComponent },
      { path: 'tags', canActivate: [AuthGuard, ModOrAdminGuard], component: TagsComponent },
      {
        path: 'add-page',
        canActivate: [AuthGuard, ModOrAdminGuard],
        component: AddPageComponent,
      },
      {
        path: 'edit-page/:id',
        canActivate: [AuthGuard, ModOrAdminGuard],
        component: EditPageComponent,
      },
      { path: 'add-tag', canActivate: [AuthGuard, ModOrAdminGuard], component: AddTagComponent },
      {
        path: 'edit-tag/:id',
        canActivate: [AuthGuard, ModOrAdminGuard],
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
