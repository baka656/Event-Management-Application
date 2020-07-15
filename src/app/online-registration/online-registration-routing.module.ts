import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineRegistrationPage } from './online-registration.page';
import { QrgenerateComponent } from './qrgenerate/qrgenerate.component';

const routes: Routes = [
  {
    path: '',
    component: OnlineRegistrationPage
  },
  {
    path: ':id',
    component: QrgenerateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineRegistrationPageRoutingModule {}
