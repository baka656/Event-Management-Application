import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { SelectedEventComponent } from './selected-event/selected-event.component';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: ':id',
    component: SelectedEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
