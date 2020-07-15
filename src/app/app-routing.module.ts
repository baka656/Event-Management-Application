import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { Login1Guard } from './guards/login1.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'online-registration',
    loadChildren: () => import('./online-registration/online-registration.module').then( m => m.OnlineRegistrationPageModule)
  },
  {
    path: 'offline-registration',
    loadChildren: () => import('./offline-registration/offline-registration.module').then( m => m.OfflineRegistrationPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'organizer',
    loadChildren: () => import('./organizer/organizer.module').then( m => m.OrganizerPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'get-my-qr',
    loadChildren: () => import('./get-my-qr/get-my-qr.module').then( m => m.GetMyQrPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [Login1Guard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
