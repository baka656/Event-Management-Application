import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetMyQrPage } from './get-my-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GetMyQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetMyQrPageRoutingModule {}
