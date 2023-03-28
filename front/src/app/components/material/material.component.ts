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
  ngOnInit(): void {
    this.fetchData();
    // this.sel_row.fetchData$.subscribe(() => {this.fetchData()})
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
  isLoad = false;
  fetchData() {
    console.log("fd");
    this.isLoad = true;
    this.cors.matAll().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: any) {
    const res = ["material", data.mat_id]
    this.sel_row.setRow(res);
  }

}
