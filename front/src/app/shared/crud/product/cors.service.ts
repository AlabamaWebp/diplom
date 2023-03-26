import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:8000/"

  matAll() {
    return this.http.get(this.url + "mat/all/");
  }
  matProd(id: number) {
    return this.http.get(this.url + "mat/prod/?pr_id="+id);
  }
  prodAll() {
    return this.http.get(this.url + "prod/all/");
  }
  getUsers() {
    return this.http.get(this.url + "users/");
  }
}
