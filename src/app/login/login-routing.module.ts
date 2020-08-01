import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: ':id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
