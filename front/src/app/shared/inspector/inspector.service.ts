import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CorsService } from '../crud/product/cors.service';

@Injectable({
  providedIn: 'root'
})
export class InspectorService implements HttpInterceptor {
  constructor(private cors: CorsService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authObj
    if (localStorage.getItem('ac')) {
      if (!req.url.includes("refresh")) {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('rf')),
        })
      }
      else {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('ac')),
        })
      }
    }
    const authReq = authObj ? authObj : req.clone();
    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse)
            console.log('Server response')
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.detail == "Signature has expired") {
              this.cors.refresh()
            }
            else if (err.error.detail == "Only access tokens are allowed") {
              localStorage.removeItem("ac")
              localStorage.removeItem("rf")

              this.cors.fetchLogin();
            }
            else if (err.status == 401) {
              console.log('Unauthorized')
            }
          }
        }
      )
    )
  }
}