import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineRegistrationPage } from './offline-registration.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineRegistrationPageRoutingModule {}
