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
  constructor(private cors: CorsService, private sel_row: RowsService){}
  title = "продуктов";
  ngOnInit(): void {
    window.location.pathname == '/user'? this.title = "продуктов" : 0;
    window.location.pathname == '/material'? this.title = "материалов" : 0;
    window.location.pathname == '/post'? this.title = "поставщиков" : 0;
  }
  delete() {
    const data = this.sel_row.getRow()
    if (data) {
      if (data[0] = "material") {
        this.cors.matDel(data[1]).subscribe((data: any) => {
          alert(data);
          this.sel_row.fetch()
        })
      }
    }
  }
  modal = false;
}
