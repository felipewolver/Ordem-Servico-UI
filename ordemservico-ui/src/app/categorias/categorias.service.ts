import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  categoriaURL: string;

  constructor(private httpClient: HttpClient) {

    this.categoriaURL = `${environment.apiUrlProd}/categorias`;
  }

  listarCategorias(): Promise<any> {
    
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.httpClient.get(this.categoriaURL)
      .toPromise();
  }
}
