import { AddPageComponent } from './pages/add-page/add-page.component';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'pages', component: PagesComponent },
      { path: 'add-page', component: AddPageComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
