import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
   
  ordemServicosUrl: string

  constructor(private httpClient: HttpClient) { 

    this.ordemServicosUrl = `${environment.apiUrlProd}/ordem-servicos`;
  }

  relatorioDeOs(id: any) {

    let params = new HttpParams();

    params = params.set('id', id);

    return this.httpClient.get(`${this.ordemServicosUrl}/relatorios`, 
      { params, responseType: 'blob' })
      .toPromise()
      .then(response => response);

  }

}
