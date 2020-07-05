import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RelatoriosOrdemServicosComponent } from './relatorios-ordem-servicos/relatorios-ordem-servicos.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'ordem-servicos', 
    component: RelatoriosOrdemServicosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_OS'] }
  }
]

@NgModule({
  declarations: [],
  exports: [RouterModule],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RelatoriosRoutingModule { }
