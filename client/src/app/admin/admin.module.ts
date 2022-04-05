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

@NgModule({
  declarations: [
    AdminComponent,
    PagesComponent,
    SidebarComponent,
    AddPageComponent,
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
