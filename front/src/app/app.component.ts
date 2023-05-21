import { Component, OnInit } from '@angular/core';
import { MaterialComponent } from './components/material/material.component';
import { CorsService } from './shared/crud/product/cors.service';
import { RowsService } from './shared/rows/rows.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public cors: CorsService, public sel_row: RowsService, private router: Router) { }

  private subs: Subscription = this.cors.is_login$.subscribe((d) => {
    if (d == "change") {
      this.changePassword = true;
    }
    else {
      this.ngOnInit();
    }
  });
  title = "продуктов";
  login = false;
  changePassword = false;
  username: any = undefined;
  changeLogin() {
    this.login = false
  }
  show_user = false;
  ngOnInit(): void {
    if (localStorage.getItem("ac")) {
      this.login = false;
      this.cors.protect().subscribe((d: any) => {
        const data = d.info
        this.username = data[1] + " " + data[0].split("")[0].toUpperCase() + "." + data[2].split("")[0].toUpperCase() + ".";
        console.log(data[3]);
        if (data[3] == 1) {
          this.show_user = true;
          this.sel_row.setUserRights(true)
        }
        else {
          this.show_user = false;
          this.sel_row.setUserRights(false)
        };
      });
      window.location.pathname == '/user' && this.show_user ? this.title = "пользователей" : 0;
      window.location.pathname == '/user' && !this.show_user ? this.router.navigate(["/params"]) : 0;
      window.location.pathname == '/material' ? this.title = "материалов" : 0;
    }
    else {
      this.login = true;
      return
    }
    this.changePassword = false;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  clickLogin(data: { username: string, password: string }) {
    this.cors.login(data);
  }
  clickChangePassword(value: any) {
    this.cors.changePass(value);
  }
  // fetchaAll() {
  //   this.cors.matAll().subscribe((d) => {
  //     this.sel_row.setProdMaterials(d);
  //   })
  //   this.cors.matTypes().subscribe((d) => {
  //     this.sel_row.setMatTypes(d);
  //   })
  //   this.cors.getRoles().subscribe((d) => {
  //     this.sel_row.setRoles(d);
  //   })
  // }
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
    this.sel_row.setRow(undefined);
    setTimeout(() => {
      this.sel_row.fetch();
    }, 1);
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
