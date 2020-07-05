import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';




@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent 
  ],
  exports: [
   // PessoasCadastroComponent,
   // PessoasPesquisaComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    PessoasRoutingModule,

    SharedModule,
    
    TableModule,
    DropdownModule,
    TooltipModule,

  ]
})
export class PessoasModule { }
