import { Component, OnInit, ViewChild } from '@angular/core';

import * as M from  'materialize-css';

import { PessoasFilter, PessoasService } from '../pessoas.service';

import { Table } from 'primeng/table';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  
  /*pessoas = [ { codigo: '23', cpf: '223.567.854-23', nome: 'Amanda...' },
              { codigo: '23', cpf: '223.567.854-23', nome: 'Michel...' },
              { codigo: '23', cpf: '223.567.854-23', nome: 'Joao...' },*/
  pessoas = [];
  
  pessoasFilter = new PessoasFilter();
  totalRegistros = 0
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(private pessoasService: PessoasService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              public segurancaService: SegurancaService
              ) { }

  ngOnInit() {
    
    this.title.setTitle('Pesquisa de Pessoas');


  }
  
  
  pesquisar(pagina = 0) {
    this.pessoasFilter.pagina = pagina;
    
    this.pessoasService.pesquisarPessoas(this.pessoasFilter)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      })
  
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    
    this.confirmationService.confirm({
      
      message: 'Tem certeza que deseja remover '+ pessoa.nome +'?',
      accept: () => {

        this.excluir(pessoa);
      }
    })
  }

  excluir(pessoa: any) {

    this.pessoasService.excluirPessoa(pessoa.id)
      .then(() => {

        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso.' })
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
