import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SegurancaService } from './seguranca.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private segurancaService: SegurancaService,
              private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.segurancaService.isAccessTokenInvalido()) {

      console.log('Navegação com access token inválido. Obtendo novo token...');
      
      return this.segurancaService.obterNovoAccessToken()
        .then(() => {
          if(this.segurancaService.isAccessTokenInvalido()) {

            this.router.navigate(['/login']);
            return false;
          }

          return true;
        });
    } else if(next.data.roles && !this.segurancaService.temQualquerPermissao(next.data.roles)) {

      this.router.navigate(['/nao-autorizado']);

      return false;
    }
    
    return true;

  }
  
}
