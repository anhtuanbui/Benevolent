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
      { path: 'role', component: RoleComponent },
      { path: 'role/add', component: AddComponent },
      { path: 'role/edit/:id', component: EditComponent },
      { path: 'feedbacks', component: FeedbackComponent },
      { path: 'feedback/detail/:id', component: DetailComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'add-page', component: AddPageComponent },
      { path: 'edit-page/:id', component: EditPageComponent },
      { path: 'add-tag', component: AddTagComponent },
      { path: 'edit-tag/:id', component: EditTagComponent },
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
