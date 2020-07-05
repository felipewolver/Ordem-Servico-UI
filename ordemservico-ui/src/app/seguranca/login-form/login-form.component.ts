import { Component, OnInit } from '@angular/core';
import { SegurancaService } from '../seguranca.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public segurancaService: SegurancaService,
              private errorHandler: ErrorHandlerService,
              private router: Router ) { }

  ngOnInit() {
  }
  
   /* Exemplo de um token do Administrador com suas permissoes
      { "user_name": "felipeferreira_811@hotmail.com", "scope": [ 
      "read", "write" ], "nome": "Administrador", 
      "exp": 1592909694, "authorities": [ "ROLE_CADASTRAR_CATEGORIA", 
      "ROLE_PESQUISAR_OS", "ROLE_PESQUISAR_PESSOA", 
      "ROLE_REMOVER_PESSOA", "ROLE_CADASTRAR_OS", "ROLE_CADASTRAR_PESSOA", 
      "ROLE_PESQUISAR_CATEGORIA", "ROLE_REMOVER_OS" ], 
      "jti": "bef25b69-7481-4331-ba5f-c72874c4eb96", "client_id": "angular" } */

  login(usuario: string, senha: string) {
    
    this.segurancaService.loginUsuario(usuario, senha) 
      .then(() => {

        this.router.navigate(['/dashboard']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
