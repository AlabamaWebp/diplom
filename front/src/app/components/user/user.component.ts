import { Component, OnInit } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private cors: CorsService) { }

  ngOnInit(): void {
    this.fetchData();
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
    "u_id",
    "u_name",
    "u_surname",
    "u_patronymic",
    "u_role",
    "u_login",
    "u_registration"
  ]
  hname = [
    "id",
    "Имя",
    "Фамилия",
    "Отчество",
    "Должность",
    "Дата последнего входа",
    "Дата регистрации"
  ]
  date_col = [
    "u_login",
    "u_registration"
  ]
  isLoad= false;
  fetchData() {
    this.isLoad = true;
    this.cors.getUsers().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.data = data;
      this.isLoad = false;
    });
  }
  SelectRow(data: any) {

  }
}
