import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { Pessoa, Estado, Cidade } from '../core/models';


export class PessoasFilter {

  nome: string;
  pagina = 0;
  itensPorPagina = 5
}


@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  
  pessoasURL: string
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private httpClient: HttpClient) {
    
    this.pessoasURL = `${environment.apiUrlProd}/pessoas`;
    this.cidadesUrl = `${environment.apiUrlProd}/cidades`;
    this.estadosUrl = `${environment.apiUrlProd}/estados`;
  }

  pesquisarPessoas(filtro: PessoasFilter): Promise<any>  {

    let params = new HttpParams();
    
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome) {

      params = params.set('nome', filtro.nome.toString());
    }

    return this.httpClient.get(`${this.pessoasURL}`, { params })
      .toPromise()
      .then(response => {

        const pessoas = response['content']
        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      })
 
  }

  buscarPessoaPorId(id: number): Promise<Pessoa> {

    return this.httpClient.get<Pessoa>(`${this.pessoasURL}/${id}` )
      .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    
    return this.httpClient.get<Estado[]>(`${this.estadosUrl}`)
      .toPromise()
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    
    const params = new HttpParams().set('estado', estado);

    return this.httpClient.get<Cidade[]>(`${this.cidadesUrl}`, { params })
      .toPromise()
      .then(response => response as Cidade[]);
  }
  
  listarTodos(): Promise<any> {

    return this.httpClient.get(this.pessoasURL)
      .toPromise();
  }

  adicionarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    
    return this.httpClient.post<Pessoa>(this.pessoasURL, pessoa)
      .toPromise();
  } 

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {

    return this.httpClient.put<Pessoa>(`${this.pessoasURL}/${pessoa.id}`, pessoa)
      .toPromise();
  }

  excluirPessoa(id: number) {

    return this.httpClient.delete(`${this.pessoasURL}/${id}`)
      .toPromise()
      .then(response => null);
  }

}
