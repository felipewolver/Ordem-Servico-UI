import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  ordemDeServicosUrl: string;

  constructor(private httpclient: HttpClient) { 

    this.ordemDeServicosUrl = `${environment.apiUrlProd}/ordem-servicos`;
  }

   
  lancarOsPorStatus(): Promise<Array<any>> {

    return this.httpclient.get(`${this.ordemDeServicosUrl}/estatisticas/por-status`)
      .toPromise()
      .then(response => response as Array<any> );
  } 

}
