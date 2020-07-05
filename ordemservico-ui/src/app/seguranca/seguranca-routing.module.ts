import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';


const routes: Routes = [

  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],

  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ]
})
export class SegurancaRoutingModule { }
