import { Component, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  constructor(private cors: CorsService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  data: any;
  header = [
    "mat_id",
    "mat_name",
    "mat_purchased",
    "mat_count",
    "mat_type",
  ]
  hname = [
    "id",
    "Название материала",
    "Покупной",
    "Кол-во",
    "Тип материала",
  ]
  isLoad= false;
  fetchData() {
    this.isLoad = true;
    this.cors.matAll().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: any) {

  }

}
