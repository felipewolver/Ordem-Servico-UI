import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorios-ordem-servicos',
  templateUrl: './relatorios-ordem-servicos.component.html',
  styleUrls: ['./relatorios-ordem-servicos.component.css']
})
export class RelatoriosOrdemServicosComponent implements OnInit {
  
  id: any;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

 
  gerar() {

    this.relatoriosService.relatorioDeOs(this.id) 
      .then(relatorio => {

        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });

  }

}
