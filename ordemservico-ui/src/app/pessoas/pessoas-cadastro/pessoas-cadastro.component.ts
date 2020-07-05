import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from 'src/app/core/models';
import { PessoasService } from '../pessoas.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {
  
  pessoa = new Pessoa();
  cidades: any[];
  estados: any[];
  estadoSelecionado: number;

 
  constructor(private pessoasService: PessoasService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private actRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit() {
    
    this.title.setTitle("Nova Pessoa");
    this.carregarEstados();

    const idPessoa = (this.actRoute.snapshot.params['id']); 
    if(idPessoa) {
      this.carregarPessoa(idPessoa);
    } 

  }

  get editando() {

    return Boolean(this.pessoa.id);
  }

  carregarEstados() {

    this.pessoasService.listarEstados()
      .then(listaEstados => {
        
        this.estados = listaEstados.map(uf => ({ label: uf.nome, value: uf.id }) );
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarCidades() {

    this.pessoasService.pesquisarCidades(this.estadoSelecionado)
      .then(listaCidades => {
        this.cidades = listaCidades.map(cidade => ({ label: cidade.nome, value: cidade.id }) );
      })
      .catch(error => this.errorHandler.handle(error));
  }

  novo(form: any) {

    form.reset();

    setTimeout(function() {

      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);

  }

  salvar(form: any) {

    if(this.editando) 
      this.atualizar(form)
    else 
      this.adicionar(form);
  }

  adicionar(form: any) {

    this.pessoasService.adicionarPessoa(this.pessoa)
      .then(novaPessoa => {

        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso.' });
        
        this.router.navigate(['/pessoas', novaPessoa.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }
  
  carregarPessoa(id: number) {

    this.pessoasService.buscarPessoaPorId(id)
      .then(pessoaExistente => {

        this.pessoa = pessoaExistente;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.id : null;
        
        if(this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      });
  }

  atualizar(form: any) {

    this.pessoasService.atualizarPessoa(this.pessoa)
      .then(pessoaExistente => {

        this.pessoa = pessoaExistente;

        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso.' });
        this.atualizarTituloEdicao();
        
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarTituloEdicao() {
    this.title.setTitle("Edição de Pessoa: "+ this.pessoa.nome);
  }
  
  // Para testes
  testar(form: any) {

    this.messageService.add({ severity: 'info', detail: 'Teste de inserção de Pessoa..' })
  
  }

  
  
}
