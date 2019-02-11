
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { NewDetailComponent } from './new-detail/new-detail.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewService } from './new.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'home', component: NewListComponent},
  { path: 'home/:id', component: NewDetailComponent},
  { path: 'dashboard', component: NewDashboardComponent}
]

@NgModule({
  declarations: [NewDashboardComponent, NewDetailComponent, NewListComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  providers: [NewService]
})
export class NewsModule { }
