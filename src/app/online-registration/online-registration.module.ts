import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, AlertController } from '@ionic/angular';

import { OnlineRegistrationPageRoutingModule } from './online-registration-routing.module';

import { OnlineRegistrationPage } from './online-registration.page';
import { QrgenerateComponent } from './qrgenerate/qrgenerate.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineRegistrationPageRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [
    OnlineRegistrationPage,
    QrgenerateComponent
  ]
})
export class OnlineRegistrationPageModule {}
