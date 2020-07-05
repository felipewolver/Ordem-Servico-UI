import { Component, OnInit, ViewChild } from '@angular/core';

import * as M from  'materialize-css';
import { OsService, OsFilter } from '../os.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Table } from 'primeng/table';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';

@Component({
  selector: 'app-os-pesquisa',
  templateUrl: './os-pesquisa.component.html',
  styleUrls: ['./os-pesquisa.component.css']
})
export class OsPesquisaComponent implements OnInit {
  
  osFilter = new OsFilter();
  totalRegistros = 0;
  ordemServicos = [];
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(private osService: OsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              public segurancaService: SegurancaService) { }

  ngOnInit() {

    this.executarDatePicker();

  }

  pesquisar(pagina = 0) {
    
    this.osFilter.pagina = pagina;

    this.osService.pesquisarOs(this.osFilter)
      .then(resultado => {

        this.ordemServicos = resultado.ordemServicos;
        this.totalRegistros = resultado.total;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    
    const pagina = event.first / event.rows; 
    this.pesquisar(pagina);
  }

  confirmarExclusao(ordemServico: any) {
    
    this.confirmationService.confirm({
      
      message: 'Tem certeza que deseja remover OS de num. '+ ordemServico.os +'?',
      accept: () => {

        this.excluir(ordemServico);
      }
    })
  }

  excluir(ordemServico: any) {

    this.osService.excluirOs(ordemServico.os)
      .then(() => {

        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'OS excluída com sucesso.' })
      })
      .catch(error => this.errorHandler.handle(error));
  }
  

  // Não estah funcionando para fazer a busca por data
  executarDatePicker() {
    document.addEventListener('DOMContentLoaded', function() {

      const elementPicker = document.querySelectorAll('.datepicker');
      const instancePicker = M.Datepicker.init(elementPicker, {

        format:'yyyy-mm-dd',
        
        // Tradução da lingua do datepicker ingles por portugues do materialize
        i18n: {
          labelMonthNext: 'Próximo mês',
          months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Ma', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          weekdaysAbbrev: ["D","S", "T", "Q", "Q", "S", "S"],
          cancel: 'Cancelar'
        }

      });
        
    });

  }

}
