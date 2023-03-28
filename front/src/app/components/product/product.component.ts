import { Component, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'app-tables',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private cors: CorsService) { }

  ngOnInit(): void {
    this.fetchData();
    console.log(this.material);

  }

  material: any
  mat_header = [
    "mat_id",
    "mat_name",
    "mat_purchased",
    "mat_count",
    "mat_type"
  ]
  mat_header_name = [
    "id",
    "Название материала",
    "Покупной",
    "Кол-во",
    "Тип материала",
  ]
  product: any
  prod_header = [
    "id",
    "name",
    "count"
  ]
  prod_header_name = [
    "id",
    "Название",
    "Кол-во"
  ]
  isLoad= false;
  fetchData() {
    this.isLoad = true;
    this.cors.prodAll().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.product = data;
      this.isLoad = false;
    });

  }
  prodSelectRow(data_1: any) {
    this.isLoad = true;
    console.log(data_1.id);
    this.cors.matProd(data_1.id).pipe(retry(5),delay(1500)).subscribe((data) => {
      this.material = data;
      this.isLoad = false;
    });
  }
  matSelectRow(data: any) {
    
  }
}
