import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OsPesquisaComponent } from './os-pesquisa/os-pesquisa.component';
import { OsCadastroComponent } from './os-cadastro/os-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

  {
    path: '', 
    component: OsPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_OS'] }
  }, 
  {
    path: 'novo',
    component: OsCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_OS'] }
    
  },
  {
    path: ':os',
    component: OsCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_OS'] }
    
  }
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  
  ]
})
export class OsRoutingModule { }
