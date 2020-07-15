import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflineRegistrationPageRoutingModule } from './offline-registration-routing.module';

import { OfflineRegistrationPage } from './offline-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflineRegistrationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfflineRegistrationPage]
})
export class OfflineRegistrationPageModule {}
