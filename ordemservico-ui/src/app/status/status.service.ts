import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  
  statusUrl: string;

  constructor(private httpCliente: HttpClient) { 

    this.statusUrl = `${environment.apiUrlProd}/status`;
  }


  listarStatus(): Promise<any> {

    return this.httpCliente.get(this.statusUrl)
      .toPromise();
  }
}
