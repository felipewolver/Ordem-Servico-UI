import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsRoutingModule } from './os-routing.module';
import { FormsModule } from '@angular/forms';

import { OsPesquisaComponent } from './os-pesquisa/os-pesquisa.component';
import { OsCadastroComponent } from './os-cadastro/os-cadastro.component';

import { SharedModule } from '../shared/shared.module';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog'
import { NgxCurrencyModule } from 'ngx-currency';




@NgModule({
  declarations: [ 
    OsPesquisaComponent, OsCadastroComponent
  
  ],
  exports: [
    
    //OsPesquisaComponent,
    //OsCadastroComponent,
    
  ],

  imports: [
    CommonModule,
    FormsModule,
    OsRoutingModule,
    
    SharedModule,
    
    NgxCurrencyModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    PanelModule,
    DialogModule
    

    
  ]
})
export class OsModule { }
