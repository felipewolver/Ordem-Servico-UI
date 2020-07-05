import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

  {
    path: '', 
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    data: { roles: ['ROLE_PESQUISAR_OS'] }

  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]


})
export class DashboardRoutingModule { }
