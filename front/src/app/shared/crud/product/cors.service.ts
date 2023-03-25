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
}
