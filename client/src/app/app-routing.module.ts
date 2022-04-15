import { AuthGuard } from './shared/guards/auth.guard';
import { InfoPageComponent } from './info-page/info-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFeedbackSuccessComponent } from './send-feedback-success/send-feedback-success.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'page/:id',
    component: InfoPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'send-feedback-success',
    component: SendFeedbackSuccessComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
