import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html',
  styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {
  
  categorias = [];

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {

    this.listar();
  }

  listar() {

    this.categoriasService.listarCategorias()
      .then(resposta => {
        this.categorias = <any> resposta; // tbm pode fazer assim: this.categorias = resposta.categorias
      })
  }


}
