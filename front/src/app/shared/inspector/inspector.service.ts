import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
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
    const d = this.cors.getTokens();
    let authObj
    if (d != undefined && d.access_token != undefined) {

      if (req.url.includes("refresh")) {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + d.refresh_token)
        })
        alert("refresh")
      }
      else {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + d.access_token)
        })
      }

    }
    const authReq = authObj ? authObj : req.clone();
    return next.handle(authReq).pipe(
      // retry(3),
      tap(
        (event) => {
          // if (event instanceof HttpResponse)
          // console.log('Server response')
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
