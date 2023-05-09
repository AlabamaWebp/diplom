import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private subs: Subscription = this.sel_row.fetchData$.subscribe(() => { this.fetchData() });

  constructor(private cors: CorsService, private sel_row: RowsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
    if (!this.sel_row.getUserRights()) {
      this.router.navigate(["/params"])
    }
  }
  data: any;
  // "u_id": 0,
  // "u_name": "",
  // "u_surname": "",
  // "u_patronymic": "",
  // "u_role": "",
  // "u_login": "",
  // "u_registration": ""
  header = [
    "id",
    "surname",
    "name",
    "patronymic",
    "role",
    // "login2",
    "login",
    "registration"
  ]
  hname = [
    "id",
    "Фамилия",
    "Имя",
    "Отчество",
    "Должность",
    // "Логин",
    "Дата последнего входа",
    "Дата регистрации"
  ]
  date_col = [
    "login",
    "registration"
  ]
  isLoad = false;
  fetchData() {
    this.isLoad = true;
    this.cors.getUsers().subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: any) {
    const res = ["user", data]
    this.sel_row.setRow(res);
    this.current_data = data
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.sel_row.setRow(undefined);
  }
  current_data: any
}
