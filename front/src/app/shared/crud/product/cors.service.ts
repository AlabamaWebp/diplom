import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:8000/"
  // mat
  matAll() {
    return this.http.get(this.url + "mat/all/").pipe(retry(5),delay(1500));
  }
  matProd(id: number) {
    return this.http.get(this.url + "mat/prod/?pr_id="+id);
  }
  matTypes() {
    return this.http.get(this.url + "mat/types/").pipe(retry(5),delay(1500));
  }
  matCreate(data: mat_data) {
    return this.http.post(this.url + "mat/create/", data).pipe(retry(5),delay(1500));
  }
  matDel(id: number) {
    return this.http.post(this.url + "mat/delete/?id="+id, undefined).pipe(retry(5),delay(1500));
  }
  matEdit(id: number, data: mat_data) {
    return this.http.post(this.url + "mat/update/?id1="+id, data).pipe(retry(5),delay(1500));

  }


  // prod
  prodAll() {
    return this.http.get(this.url + "prod/all/");
  }
  prodCreate(data: any) {
    return this.http.post(this.url + "prod/create/", data).pipe(retry(5),delay(1500));
  }
  prodUpdate(id: number, data: any) {
    return this.http.post(this.url + "prod/update/?id1="+id, data).pipe(retry(5),delay(1500));
  }
  prodDel(id: number) {
    return this.http.post(this.url + "prod/delete/?id="+id, undefined).pipe(retry(5),delay(1500));
  }


  // users
  getUsers() {
    return this.http.get(this.url + "users/").pipe(retry(5),delay(1500));
  }
  getRoles() {
    return this.http.get(this.url + "users/roles/").pipe(retry(5),delay(1500));
  }
  createUser(data: user_data) {
    return this.http.post(this.url + "users/create/", data).pipe(retry(5),delay(1500));
  }
  updateUser(id: number, data: user_data) {
    return this.http.post(this.url + "users/update/?id=" + id, data).pipe(retry(5),delay(1500));
  }
  deleteUser(id: number) {
    return this.http.post(this.url + "users/delete/?id="+id, undefined).pipe(retry(5),delay(1500));
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