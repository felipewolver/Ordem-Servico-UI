import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasPesquisaComponent } from './categorias/categorias-pesquisa/categorias-pesquisa.component';
// import { NavbarComponent } from './core/navbar/navbar.component';
//import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
//import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
//import { OsPesquisaComponent } from './os/os-pesquisa/os-pesquisa.component';
import { OsModule } from './os/os.module';
import { StatusPesquisaComponent } from './status/status-pesquisa/status-pesquisa.component';
import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent,
    CategoriasPesquisaComponent,
   // OsPesquisaComponent,
    StatusPesquisaComponent,
 
   // NavbarComponent,
   // PessoasPesquisaComponent,
   // PessoasCadastroComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    
    CoreModule,
    //PessoasModule,
    //OsModule,
    SegurancaModule,

    FormsModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
