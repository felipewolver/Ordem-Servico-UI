import { Component, OnInit } from '@angular/core';

import * as M from 'materialize-css';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public segurancaService: SegurancaService,
              private errorHandle: ErrorHandlerService,
              private router: Router ) { }

  ngOnInit() {

    this.executarSidebar();
  }
  
  
  logout() {

    this.segurancaService.logout()
      .then(() => {

        this.router.navigate(['/login'])
      })
      .catch(error => this.errorHandle.handle(error));
  }

  // metodo que executa o menu sidebar ao clicar no icone responsivo
  executarSidebar() {

    const elementSidebar = document.querySelectorAll(".sidenav");
    const instanceSidebar = M.Sidenav.init(elementSidebar);
     
  }

}
