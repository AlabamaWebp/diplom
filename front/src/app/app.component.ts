import { Component, OnInit } from '@angular/core';
import { MaterialComponent } from './components/material/material.component';
import { CorsService } from './shared/crud/product/cors.service';
import { RowsService } from './shared/rows/rows.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cors: CorsService, public sel_row: RowsService) { }

  private subs: Subscription = this.cors.is_login$.subscribe(() => {
    this.ngOnInit();
  });
  title = "продуктов";
  login = false;
  changeLogin() {
    this.login = false
  }
  ngOnInit(): void {
    if (localStorage.getItem('ac')) {
      this.login = false;
    }
    else {
      this.login = true;
      return
    }
    window.location.pathname == '/user' ? this.title = "пользователей" : 0;
    window.location.pathname == '/material' ? this.title = "материалов" : 0;
    this.fetchaAll();
    // window.location.pathname == '/post'? this.title = "поставщиков" : 0;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  clickLogin(data: { username: string, password: string }) {
    this.cors.login(data);
  }

  fetchaAll() {
    this.cors.matAll().subscribe((d) => {
      this.sel_row.setProdMaterials(d);
    })
    this.cors.matTypes().subscribe((d) => {
      this.sel_row.setMatTypes(d);
    })
    this.cors.getRoles().subscribe((d) => {
      this.sel_row.setRoles(d);
    })
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
        this.cors.prodDel(data[1].id).subscribe(() => {
        })
      }
      else if (data[0] == "user") {
        this.cors.deleteUser(data[1].id).subscribe(() => {
        })
      }
    }
    this.sel_row.fetch()
  }

  edit() {
    const data = this.sel_row.getRow()

    if (data) {
      if (data[0] == "material") {
        // this.active_modal = 1;
        // this.is_edit = true;
        this.modal = 2;
      }
      else if (data[0] == "prod") {
        this.modal = 4;
      }
      else if (data[0] == "user") {
        this.modal = 6;
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
