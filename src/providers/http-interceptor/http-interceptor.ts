import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let loader = this.loadingCtrl.create({
      content: 'Aguarde, carregando...'
    });

    loader.present();

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        loader.dismiss();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 401 || err.status === 403 || err.status === 407) {
          // redirect to the login route
          // or show a modal
          if (err.error && err.error.message) {
            // this.msg.nofiticationError(err.error.message);
          } else {
            // this.msg.nofiticationError(err.error);
          }

          // this.router.navigate(['/login']);
        } else if (err.status === 504) {
          // this.msg.nofiticationError('Erro de gateway - favor entrar em contato com o Suporte. <br/>Detalhes: ' + err.error);
        }
      }
    });
  }

  constructor(public loadingCtrl: LoadingController) {

  }

}
