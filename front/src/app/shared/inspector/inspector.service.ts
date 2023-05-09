import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, retry, switchMap, take, tap, throwError } from 'rxjs';
import { CorsService } from '../crud/product/cors.service';

@Injectable()
export class InspectorService implements HttpInterceptor {
  constructor(private cors: CorsService) { }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private handleRefreshError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.cors.refreshSub().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(req: HttpRequest<any>, d: any) {
    localStorage.setItem('ac', d.access_token);
    localStorage.setItem('rf', d.refresh_token);

    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + d.access_token)
      // setHeaders: { 'Authorization': 'Bearer ' + d.access_token }
    })
  }

  private logout() {
    localStorage.removeItem("ac")
    localStorage.removeItem("rf")
    this.cors.fetchLogin();
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    let authObj = req.clone()
    if (localStorage.getItem("ac")) {

      if (req.url.includes("refresh")) {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem("rf"))
        })
      }
      else {
        authObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem("ac"))
        })
      }

    }
    return next.handle(authObj).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.error.detail == "Signature has expired") {
          return this.handleRefreshError(req, next)
        }
        else if (err.error.detail == "Only access tokens are allowed") {
          this.logout()
          return throwError(() => err)
        }
        else {
          return throwError(() => err)
        }
      }
      else {
        return throwError(() => err)
      }
    }));
  }
}



// return next.handle(authObj).pipe(
//   // delay(1500),
//   tap(
//     (event) => {
//       // if (event instanceof HttpResponse)
//       // console.log('Server response')
//     },
//     (err) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.error.detail == "Signature has expired") {
//           // return this.cors.refreshSub().subscribe((d: any) => {
//           //   return next.handle(this.addToken(req, d));
//           // })
//           return this.handleRefreshError(req, next)
//         }
//         else if (err.error.detail == "Only access tokens are allowed") {
//           this.logout()
//         }
//       }
//       return throwError(() => err)
//     }
//   ),
// )