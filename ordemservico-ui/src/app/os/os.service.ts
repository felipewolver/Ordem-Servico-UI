import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

import * as moment from 'moment';
import { OrdemServico, Status, Categoria, Pessoa } from '../core/models';




export class OsFilter {

  equipamento: string;
  dataRecebimentoInicio: Date
  dataRecebimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root'
})
export class OsService {

  osUrl: string;
  statusUrl: string;
  categoriasUrl: string;
  pessoasUrl: string

  constructor( private httpClient: HttpClient) {

    this.osUrl = `${environment.apiUrlProd}/ordem-servicos`;
    this.statusUrl = `${environment.apiUrlProd}/status`;
    this.categoriasUrl = `${environment.apiUrlProd}/categorias`;
    this.pessoasUrl = `${environment.apiUrlProd}/pessoas`;
  }


  pesquisarOs(filtro: OsFilter): Promise<any> {
    
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.equipamento) {

      params = params.set('equipamento', filtro.equipamento);
    }

    if(filtro.dataRecebimentoInicio) {
      
      params = params.set('dataRecebimentoDe', moment(filtro.dataRecebimentoInicio)
        .format('YYYY-MM-DD'));
    }

    if(filtro.dataRecebimentoFim) {

      params = params.set('dataRecebimentoAte', moment(filtro.dataRecebimentoFim)
      .format('YYYY-MM-DD'));
    }

    return this.httpClient.get(this.osUrl, { params })
      .toPromise()
      .then(response => {

        const ordemServicos = response['content'];
        const resultado = {
          ordemServicos,
          total: response['totalElements']
        }

        return resultado;
      });

  }

  buscarOsPorId(id: number): Promise<OrdemServico> {
    
    return this.httpClient.get<OrdemServico>(`${this.osUrl}/${id}`)
      .toPromise();
   
  }

  adicionarOs(ordemServico: OrdemServico): Promise<OrdemServico> {

    return this.httpClient.post<OrdemServico>(this.osUrl, ordemServico)
      .toPromise();
  }

  atualizarOs(ordemServico: OrdemServico): Promise<OrdemServico> {

    return this.httpClient.put<OrdemServico>(`${this.osUrl}/${ordemServico.os}`, ordemServico)
      .toPromise();
      /*.then(osExistente => {

        this.converterStringsParaData([osExistente]);

        return osExistente;
      }) */
  }

  excluirOs(id: number) {

    return this.httpClient.delete(`${this.osUrl}/${id}`)
      .toPromise()
      .then(response => null);
  }

  // Não esta sendo usado para este projeto
  converterStringsParaData(ordemServicos: OrdemServico[]) {

    for(const os of ordemServicos) {

      os.dataRecebimento = moment(os.dataRecebimento, 'YYYY-MM-DD').toDate();
      if(os.dataEntrega) {
        os.dataEntrega = moment(os.dataEntrega, 'YYYY-MM-DD').toDate();
      }
    
    }
  }

}
