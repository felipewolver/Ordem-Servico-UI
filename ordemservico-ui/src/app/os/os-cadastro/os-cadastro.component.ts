import { Component, OnInit, Input } from '@angular/core';

import * as M from  'materialize-css';
import { OsService } from '../os.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OrdemServico, Servico } from 'src/app/core/models';
import { StatusService } from 'src/app/status/status.service';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';



@Component({
  selector: 'app-os-cadastro',
  templateUrl: './os-cadastro.component.html',
  styleUrls: ['./os-cadastro.component.css']
})
export class OsCadastroComponent implements OnInit {
  
  ordemServico = new OrdemServico();
  listaStatus: any[];
  categorias: any[];
  pessoas: any[];

  /* Variaveis para parte cadastro de serviços */
  servico: Servico;
  exibindoFormularioServico = false;
  servicoIndex: number;
  valorTotal = 0;

  constructor(private osService: OsService,
              private statusService: StatusService,
              private categoriaService: CategoriasService,
              private pessoaService: PessoasService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private actRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit() {
    
    this.title.setTitle("Nova OS");
    
    const idOs = (this.actRoute.snapshot.params['os']);
    if(idOs) {

      this.carregarOs(idOs);
    }

    //this.executarDatePicker();
    this.carregarStatus();
    this.carregarCategorias();
    this.carregarPessoas();
  
  }

  get editando() {

    return Boolean(this.ordemServico.os);
  }

  carregarStatus() {

    this.statusService.listarStatus()
      .then(listaStatus => {
        
        this.listaStatus = listaStatus.map(s => ({ label: s.descricao, value: s.id }) );
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarCategorias() {

    this.categoriaService.listarCategorias()
      .then(listaCategorias => {

        this.categorias = listaCategorias.map(cat => ({ label: cat.nome, value: cat.id }) );
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarPessoas() {

    this.pessoaService.listarTodos()
      .then(listaPessoas => {
        
        this.pessoas = listaPessoas.content.map(p => ({ label: p.nome, value: p.id }) )
      })
      .catch(error => this.errorHandler.handle(error));
  }
  
  carregarOs(id: number) {

    this.osService.buscarOsPorId(id)
      .then(osExistente => {

        this.ordemServico = osExistente;
        this.carregarStatus();
        this.carregarPessoas();
        this.carregarCategorias();

        this.atualizarTituloEdicao();
      });

  }

  novo(form: any) {

    form.reset();

    setTimeout(function() {

      this.ordemServico = new OrdemServico();
    }.bind(this), 1); 

    this.router.navigate(['/ordem-servicos/novo']);

  }

  salvar(form: any) {
  
    if(this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: any) {

    this.osService.adicionarOs(this.ordemServico)
      .then(novaOs => {

        this.messageService.add({ severity: 'success', detail: 'OS adicionada com sucesso.' });
        
        this.router.navigate(['/ordem-servicos', novaOs.os]);
      }) 
      .catch(error => this.errorHandler.handle(error)); 
  }

  atualizar(form: any) {

    this.osService.atualizarOs(this.ordemServico)
      .then(osExistente => {

        this.ordemServico = osExistente;

        this.messageService.add({ severity: 'success', detail: 'OS atualizada com sucesso.' });
      
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarTituloEdicao() {

    this.title.setTitle("Edição de OS: "+ this.ordemServico.os);
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

  /* Inicio da parte Cadastro de servicos */
  
  get editandoServico() {

    return this.servico && this.servico.id;
  }

  prepararNovoServico() {
    
    this.ordemServico.valor = 0;
    this.exibindoFormularioServico = true;

    this.servico = new Servico();
    this.servicoIndex = this.ordemServico.servicos.length;

  }

  confirmarServico(form: any) {
   
    this.ordemServico.servicos[this.servicoIndex] = this.clonarServico(this.servico);

    this.exibindoFormularioServico = false;
    this.somarValor();
    form.reset();
  }
  
  prepararEdicaoServico(servico: Servico, index: number) {
    
    this.ordemServico.valor = 0;
    this.servico = this.clonarServico(servico); // this.servico recebe a copia do objeto servico para não perde-lo no momento da edição
    
    this.exibindoFormularioServico = true;
    this.servicoIndex = index;
    
  }

  removerServico(index: number) {
    
    this.ordemServico.valor = 0;
    this.ordemServico.servicos.splice(index, 1);
    this.somarValor();
  }

  somarValor() {
                                                           // Vai somar todos os valores dos serviços cadastrados
    this.ordemServico.servicos.forEach(s => this.ordemServico.valor = 
      Number(this.ordemServico.valor) + Number(s.valor));
    
    // console.log("Valor total OS: "+ this.ordemServico.valor); para testes
  }

  clonarServico(servico: Servico): Servico {

    return new Servico(servico.id, servico.descricao, servico.valor);
  }

  /* Fim da parte Cadastro de servicos */

}
