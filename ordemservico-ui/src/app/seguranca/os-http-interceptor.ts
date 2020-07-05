import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SegurancaService } from './seguranca.service';


export class NoAuthenticatedError {}


@Injectable()
export class OsHttpInterceptor implements HttpInterceptor {
    
    constructor(private segurancaService: SegurancaService ) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if(!req.url.includes('/oauth/token') && this.segurancaService.isAccessTokenInvalido()) {

            console.log('Requisição com Http Access Token invalido. Obtendo um novo Token... ');

            return from(this.segurancaService.obterNovoAccessToken())
                .pipe(
                    mergeMap(() => {
                        if(this.segurancaService.isAccessTokenInvalido()) {
                            throw new NoAuthenticatedError();
                        }

                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                        
                        return next.handle(req);
                    })
                );
             
        }

        return next.handle(req);
    }


}