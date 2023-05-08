import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, delay, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  // headers = new HttpHeaders();
  headers = {'Authorization': 'Bearer ' + localStorage.getItem("ac")};

  setHeader(token: string) {
    // this.headers = new HttpHeaders({

    // })
    this.headers = {
      'Authorization': 'Bearer ' + token,
    }
  }

  login(data: {username: string, password: string}) {
    this.http.post(this.url + "login/", data).pipe(retry(5),delay(1500)).subscribe((d) => {
      //@ts-ignore
      this.setHeader(d.access_token)
      //@ts-ignore
      localStorage.setItem('ac', d.access_token);
      //@ts-ignore
      localStorage.setItem('rf', d.refresh_token);
      this.fetchLogin();
    });
  }

  public is_login$ = new Subject;
  fetchLogin() {
    this.is_login$.next(undefined);
  }

  refresh() {
    if (localStorage.getItem('rf')) {
      //@ts-ignore
      this.setHeader(localStorage.getItem('rf'))
      this.http.post(this.url + "refresh/", {
        headers: this.headers
      }).pipe(retry(5),delay(1500)).subscribe((d) => {
        //@ts-ignore
        this.setHeader(d.access_token)
        //@ts-ignore
        localStorage.setItem('ac', d.access_token);
        //@ts-ignore
        localStorage.setItem('rf', d.refresh_token);
      })
    }
  }

  url = "http://127.0.0.1:8000/"
  // mat
  matAll() {
    return this.http.get(this.url + "mat/all/", {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  matProd(id: number) {
    return this.http.get(this.url + "mat/prod/?pr_id="+id, {
      headers: this.headers
    });
  }
  matTypes() {
    return this.http.get(this.url + "mat/types/", {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  matCreate(data: mat_data) {
    return this.http.post(this.url + "mat/create/", data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  matDel(id: number) {
    return this.http.post(this.url + "mat/delete/?id="+id, undefined, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  matEdit(id: number, data: mat_data) {
    return this.http.post(this.url + "mat/update/?id1="+id, data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));

  }


  // prod
  prodAll() {
    return this.http.get(this.url + "prod/all/", {
      headers: this.headers
    });
  }
  prodCreate(data: any) {
    return this.http.post(this.url + "prod/create/", data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  prodUpdate(id: number, data: any) {
    return this.http.post(this.url + "prod/update/?id1="+id, data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  prodDel(id: number) {
    return this.http.post(this.url + "prod/delete/?id="+id, undefined, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }


  // users
  getUsers() {
    return this.http.get(this.url + "users/", {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  getRoles() {
    return this.http.get(this.url + "users/roles/", {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  createUser(data: user_data) {
    return this.http.post(this.url + "users/create/", data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  updateUser(id: number, data: user_data) {
    return this.http.post(this.url + "users/update/?id=" + id, data, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }
  deleteUser(id: number) {
    return this.http.post(this.url + "users/delete/?id="+id, undefined, {
      headers: this.headers
    }).pipe(retry(5),delay(1500));
  }


  // postavshik
  // getPost() {
  //   return this.http.get(this.url + "postavshik/all/");
  // }
  // createPostavshik(data: any) {
  //   return this.http.post(this.url + "postavshik/create/", data);
  // }
  // getPostTypes() {
  //   return this.http.get(this.url + "postavshik/types/")
  // }
  // getPostNames() {
  //   return this.http.get(this.url + "postavshik/names/")
  // }
}
export class mat_data {
  "Name": string = ""
  "Purchased": number = 0
  "TypeId": number = 1
  "Count": number = 0
}
export class prod_data {
  "name": string = ""
  "count": number = 0
}
export class user_data {
  "name": string = ""
  "surname": string = ""
  "patronymic": string = ""
  "login": string = ""
  "password": string = ""
  "role": number = 0
}