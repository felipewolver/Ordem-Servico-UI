import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

  {  
    path: '', 
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
    
  },

  {
    path: 'novo',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    
  },

  {
    path: ':id',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    
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
export class PessoasRoutingModule { }
