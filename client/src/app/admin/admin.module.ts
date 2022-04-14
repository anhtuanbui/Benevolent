import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PagesComponent } from './pages/pages.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { RegisterSucceededComponent } from './account/register-succeeded/register-succeeded.component';
import { TagsComponent } from './tags/tags.component';
import { AddTagComponent } from './tags/add-tag/add-tag.component';
import { EditTagComponent } from './tags/edit-tag/edit-tag.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DetailComponent } from './feedback/detail/detail.component';
import { RoleComponent } from './role/role.component';
import { AddComponent } from './role/add/add.component';
import { EditComponent } from './role/edit/edit.component';
import { MemberComponent } from './member/member.component';
import { AssignRoleComponent } from './member/assign-role/assign-role.component';

@NgModule({
  declarations: [
    AdminComponent,
    PagesComponent,
    SidebarComponent,
    AddPageComponent,
    SignInComponent,
    SignUpComponent,
    RegisterSucceededComponent,
    TagsComponent,
    AddTagComponent,
    EditTagComponent,
    EditPageComponent,
    FeedbackComponent,
    DetailComponent,
    RoleComponent,
    AddComponent,
    EditComponent,
    MemberComponent,
    AssignRoleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class AdminModule {}
