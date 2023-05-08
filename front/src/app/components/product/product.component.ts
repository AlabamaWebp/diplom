import { Component, OnInit } from '@angular/core';
import { delay, retry, Subscription } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'app-tables',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private subs: Subscription = this.sel_row.fetchData$.subscribe(() => {
    this.fetchData();
    this.material = undefined;
    this.prodSelectRow(this.data_select_row);
  });

  constructor(private cors: CorsService, private sel_row: RowsService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.sel_row.setRow(undefined);
  }

  ngOnInit(): void {
    this.fetchData();
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
  isLoad = false;
  isLoad2 = false;
  fetchData() {
    this.isLoad = true;
    this.cors.prodAll().subscribe((data) => {
      this.product = data;
      this.isLoad = false;
    });
  }
  data_select_row: any
  prodSelectRow(data_1: any) {
    this.data_select_row = data_1;
    this.isLoad2 = true;
    const res = ["prod", data_1]
    this.sel_row.setRow(res);
    this.cors.matProd(data_1.id).subscribe((data) => {
      this.material = data;
      this.isLoad2 = false;
    });
  }
}
