import { Component, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'app-postavshik',
  templateUrl: './postavshik.component.html',
  styleUrls: ['./postavshik.component.scss']
})
export class PostavshikComponent implements OnInit {

  constructor(private cors: CorsService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  data: any;
  header = [
    "id",
    "name",
    "email",
    "telephone",
    "address",
  ]
  hname = [
    "id",
    "Название компании",
    "Емаил компании",
    "Телефон компании",
    "Город компании"
  ]
  isLoad= false;
  fetchData() {
    this.isLoad = true;
    this.cors.getPost().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: any) {

  }

}
