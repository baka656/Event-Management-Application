import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetMyQrPageRoutingModule } from './get-my-qr-routing.module';

import { GetMyQrPage } from './get-my-qr.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetMyQrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GetMyQrPage]
})
export class GetMyQrPageModule {}
