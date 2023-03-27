import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:8000/"
  // mat
  matAll() {
    return this.http.get(this.url + "mat/all/");
  }
  matProd(id: number) {
    return this.http.get(this.url + "mat/prod/?pr_id="+id);
  }
  matTypes() {
    return this.http.get(this.url + "mat/types/");
  }
  matCreate(data: any) {
    return this.http.post(this.url + "mat/create/", data);
  }


  // prod
  prodAll() {
    return this.http.get(this.url + "prod/all/");
  }


  // users
  getUsers() {
    return this.http.get(this.url + "users/");
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
