import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { OsHttpInterceptor } from './os-http-interceptor';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],

  imports: [
    CommonModule,
    JwtModule.forRoot({

      config: {

        tokenGetter: tokenGetter,
        whitelistedDomains: ['ordemservico-api.herokuapp.com'],
        blacklistedRoutes: ['https://ordemservico-api.herokuapp.com/oauth/token']
      }
    }),
    
    FormsModule,

    SegurancaRoutingModule,
    SharedModule,

  ],
  providers: [ 
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OsHttpInterceptor,
      multi: true
    },
    
    AuthGuard
  
  ]
})
export class SegurancaModule { }
