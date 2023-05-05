import { Component, OnInit } from '@angular/core';
import { MaterialComponent } from './components/material/material.component';
import { CorsService } from './shared/crud/product/cors.service';
import { RowsService } from './shared/rows/rows.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private cors: CorsService, public sel_row: RowsService){}
  title = "продуктов";
  ngOnInit(): void {
    window.location.pathname == '/user'? this.title = "пользователей" : 0;
    window.location.pathname == '/material'? this.title = "материалов" : 0;
    // window.location.pathname == '/post'? this.title = "поставщиков" : 0;
  }
  delete() {
    const data = this.sel_row.getRow()
    
    if (data) {
      this.modal = -1;
      // this.is_edit = false;
      if (data[0] == "material") {
        this.cors.matDel(data[1].mat_id).subscribe(() => {
          // this.sel_row.fetch()
        })
      }
      else if (data[0] == "prod") {
        this.cors.prodDel(data[1]).subscribe(() => {
        })
      }
    }
    this.sel_row.fetch()
  }

  edit() {
    const data = this.sel_row.getRow()
    
    if (data) {
      console.log(data);
      if (data[0] == "material") {
        // this.active_modal = 1;
        // this.is_edit = true;
        this.modal = 2;
      }
      else if (data[0] == "prod") {
        this.modal = 4;
      }
    }
  }
  // is_edit = false;
  // active_modal = -1;
  modal = -1;
  changeModal(num: any) {
    this.modal = num;
  }
  test(el: any) {
    console.log(el);
  }
}
