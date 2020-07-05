import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosOrdemServicosComponent } from './relatorios-ordem-servicos/relatorios-ordem-servicos.component';
import { FormsModule } from '@angular/forms';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RelatoriosOrdemServicosComponent],
  imports: [
    CommonModule,
    FormsModule,

    RelatoriosRoutingModule,

    SharedModule
  ]
})
export class RelatoriosModule { }
