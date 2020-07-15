import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizerPageRoutingModule } from './organizer-routing.module';

import { OrganizerPage } from './organizer.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizerPageRoutingModule
  ],
  declarations: [
    OrganizerPage,
    DashboardComponent,
    UpdateComponent,
    ViewComponent
  ]
})
export class OrganizerPageModule {}
