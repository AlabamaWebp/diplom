import { Component, HostListener, OnInit } from '@angular/core';
import { delay, retry, Subscription } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {;
  
  private subs: Subscription = this.sel_row.fetchData$.subscribe(() => {this.fetchData()});

  constructor(private cors: CorsService, private sel_row: RowsService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.sel_row.setRow(undefined);
  }
  ngOnInit(): void {
    this.fetchData();
  }
  data: any;
  // header = [
  //   // "mat_id",
  //   "mat_name",
  //   "mat_purchased",
  //   "mat_count",
  //   "mat_type",
  // ]
  // hname = [
  //   // "id",
  //   "Название материала",
  //   "Покупной",
  //   "Кол-во",
  //   "Тип материала",
  // ]
  isLoad = false;
  fetchData() {
    this.isLoad = true;
    this.cors.matAll().subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: response_mat) {
    const res = ["material", data]
    this.sel_row.setRow(res);
    this.current_data = data
  }
  current_data: any;
}

export class response_mat{
  mat_id: number = 0
  mat_name: string = ""
  mat_purchased: number = 0
  mat_count: number = 0
  mat_type: string = ""
}