import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  pieChartData: any;
  barChartData: any;  /* para testes = {
    labels: ['Orçamento', 'Em análise', 'Aprovado', 'Reprovado', 'Finalizado'],
    datasets: [
      {
        data: [2500, 2700, 550, 235],
        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
      }
    ]
  }; */

  options = {
    tooltips: {
      callbacks: {
        
        label: (tooltipItem, data) => {

          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor   = dataset.data[tooltipItem.index];
          const label   = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  }
  
  lineChartData: any;  /* para testes  = {
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Reprovado',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC'
      }, {
        label: 'Finalizado',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00'
      }
    ]
  }; */

  constructor(private dashboardService: DashboardService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {

    this.configurarGraficoGeral();
    this.configurarGraficoLinha();
  }

  // Vai ser configurado para os tres gráficos do dashboard
  configurarGraficoGeral() {

    this.dashboardService.lancarOsPorStatus()
      .then(dados => {

        this.pieChartData = {

          labels: dados.map(dado => dado.status.descricao),
          datasets: [
            {
              data: dados.map(data => data.total),
             
              backgroundColor: ['#FF9900', '#CD0000', '#990099', '#109618',
              '#DD4477', '#CD0000'] // REPROVADO vermelho - '#CD0000', FINALIZADO verde - #109618
            }
          ] 
        }
      
      });
  }

  configurarGraficoLinha() {

    this.dashboardService.lancarOsPorStatus()
      .then(dados => {

        this.lineChartData = {
          
          labels: dados.map(dado => dado.status.descricao),
          datasets: [

            { 
              label: 'Serviços',
              data: dados.map(data => data.total),
              borderColor: '#3366CC',

            }
          ]  
        }
    
    });
  }

}
