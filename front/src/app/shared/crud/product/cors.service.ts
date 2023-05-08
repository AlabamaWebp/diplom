import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, delay, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  // .pipe(retry(5),delay(1500))

  // headers = new HttpHeaders();
  // headers = { 'Authorization': 'Bearer ' + localStorage.getItem("ac") };

  login(data: { username: string, password: string }) {
    this.http.post(this.url + "login/", data).subscribe((d) => {
      //@ts-ignore
      localStorage.setItem('ac', d.access_token);
      //@ts-ignore
      localStorage.setItem('rf', d.refresh_token);
      this.tokens = d
      this.fetchLogin();
    });
  }

  public is_login$ = new Subject;
  fetchLogin() {
    this.is_login$.next(undefined);
  }

  tokens: any = { access_token: localStorage.getItem("ac"), refresh_token: localStorage.getItem("rf") }
  getTokens() {
    return this.tokens;
  }

  refresh() {
    if (localStorage.getItem('rf')) {
      this.http.post(this.url + "refresh/", undefined).subscribe((d) => {
        //@ts-ignore
        localStorage.setItem('ac', d.access_token);
        //@ts-ignore
        localStorage.setItem('rf', d.refresh_token);
        this.tokens = d;
      })
    }
  }

  url = "http://127.0.0.1:8000/"
  // mat
  matAll() {
    return this.http.get(this.url + "mat/all/");
  }
  matProd(id: number) {
    return this.http.get(this.url + "mat/prod/?pr_id=" + id);
  }
  matTypes() {
    return this.http.get(this.url + "mat/types/");
  }
  matCreate(data: mat_data) {
    return this.http.post(this.url + "mat/create/", data);
  }
  matDel(id: number) {
    return this.http.post(this.url + "mat/delete/?id=" + id, undefined);
  }
  matEdit(id: number, data: mat_data) {
    return this.http.post(this.url + "mat/update/?id1=" + id, data);

  }


  // prod
  prodAll() {
    return this.http.get(this.url + "prod/all/");
  }
  prodCreate(data: any) {
    return this.http.post(this.url + "prod/create/", data);
  }
  prodUpdate(id: number, data: any) {
    return this.http.post(this.url + "prod/update/?id1=" + id, data);
  }
  prodDel(id: number) {
    return this.http.post(this.url + "prod/delete/?id=" + id, undefined);
  }


  // users
  getUsers() {
    return this.http.get(this.url + "users/");
  }
  getRoles() {
    return this.http.get(this.url + "users/roles/");
  }
  createUser(data: user_data) {
    return this.http.post(this.url + "users/create/", data);
  }
  updateUser(id: number, data: user_data) {
    return this.http.post(this.url + "users/update/?id=" + id, data);
  }
  deleteUser(id: number) {
    return this.http.post(this.url + "users/delete/?id=" + id, undefined);
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