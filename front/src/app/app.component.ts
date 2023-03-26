import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "продуктов";
  ngOnInit(): void {
    window.location.pathname == '/user'? this.title = "продуктов" : 0;
    window.location.pathname == '/material'? this.title = "материалов" : 0;
    window.location.pathname == '/post'? this.title = "поставщиков" : 0;
  }
  modal = false;
}
