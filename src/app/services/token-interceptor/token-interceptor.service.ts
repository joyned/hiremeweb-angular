import { Injectable, NgModule, Injector } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: import('@angular/common/http').HttpRequest<any>,
            next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    if (req.url.includes('/api/login') || req.url.includes('api/job/all') || req.url.includes('api/job/detail')
      || req.url.includes('api/register') || req.url.includes('api/v1/localidades/estados')) {
      return next.handle(req);
    } else {
      const dupReq = req.clone({
        headers: req.headers.set('key', loginService.getToken()),
      });
      return next.handle(dupReq);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})

export class Interceptor { }
