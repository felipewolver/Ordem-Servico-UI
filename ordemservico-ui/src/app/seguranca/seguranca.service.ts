import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
  /* Classe de segurança para OAuthSecurity */
export class SegurancaService {
  
  oauthTokenUrl: string;
  jwtPayLoad: any;
  tokensRevokeUrl: string

  constructor(private httpClient: HttpClient,
              private jwtHelperService: JwtHelperService) {
    
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrlProd}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrlProd}/tokens/revoke`
  }
  
  
  loginUsuario(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    
    return this.httpClient.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {

        // console.log(response); console para testes
        this.armazenarToken(response['access_token']);

      })
      .catch(response => {

        // console.error('Motivo do erro: '+ response) console para testes.
        if(response.status === 400) {
          
          const responseError = response.error;
          
          if(responseError.error === 'invalid_grant') {

            return Promise.reject('Usuário ou senha inválida!');
          } 
        }

        return Promise.reject(response);

      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');
    
    const body = 'grant_type=refresh_token';
    
    return  this.httpClient.post(this.oauthTokenUrl, body, { headers, withCredentials: true } )
      .toPromise()
      .then(response => { 

        this.armazenarToken(response['access_token']);

        console.log('Novo access token criado...');

        return Promise.resolve(null);
      })
      .catch(response => {

        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {

    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  temQualquerPermissao(roles) {
    for(const role of roles) {
      if(this.temPermissao(role)) {

        return true;
      }
    }

    return false;
  }

  temPermissao(permissao: string) {

    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  logout() {

    return this.httpClient.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        
        this.limparAccessToken();
      })
  }


  private limparAccessToken() {

    localStorage.removeItem('token');

    this.jwtPayLoad = null;
  }

  private carregarToken() {

    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }

  }

  private armazenarToken(token: string) {

    this.jwtPayLoad = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }
  
}
