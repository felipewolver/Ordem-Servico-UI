import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { CategoriasService } from '../categorias/categorias.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { SegurancaService } from '../seguranca/seguranca.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { OsService } from '../os/os.service';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { Title } from '@angular/platform-browser';
import { RelatoriosService } from '../relatorios/relatorios.service';


registerLocaleData(localePt);


@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,
    
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    CategoriasService,
    PessoasService,
    OsService,
    SegurancaService,
    RelatoriosService,

    MessageService,
    ConfirmationService,

    { provide: LOCALE_ID, useValue: 'pt-BR' },

    JwtHelperService,
    Title
  
  ],

  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
  ]
})
export class CoreModule { }
