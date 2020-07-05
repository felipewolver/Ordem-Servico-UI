import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { NoAuthenticatedError } from '../seguranca/os-http-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
              private router: Router) { }

  
  handle(errorResponse: any) {

    let msg: string;

    if(typeof errorResponse === 'string') {
      
      msg = errorResponse;
    
    } else if(errorResponse instanceof NoAuthenticatedError) {

      msg = 'Sua sessão expirou.';
      this.router.navigate(['/login']);

    } else if(errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400
        && errorResponse.status <= 499) {
                          
      msg = 'Ocorreu um erro ao processar a sua solicitação. Verificar Campos';
      try {

        msg = errorResponse[0].mensagemUsuario;
      } catch(e) {}

      if( errorResponse.status === 403) {
        msg = 'Voce não tem permissao para executar esta ação!';
      }

      console.error('Motivo do erro: ', errorResponse);
    } else {

      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Motivo do erro: ', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  
  }


}
