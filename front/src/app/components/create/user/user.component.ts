import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'create-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent2 implements OnInit {

  @Input() is_edit = false;
  @Output() close = new EventEmitter();
  @Output() mchange = new EventEmitter();
  title = "Создание";
  
  constructor(private cors: CorsService, private sel_row: RowsService) { }

  goBack() {
    this.mchange.emit(0);
  }

  ngOnInit(): void {
    if (this.is_edit) {
      this.title = "Изменение";
      const data = this.sel_row.getRow()[1];
      //@ts-ignore
      document.getElementById("name").value = data.name;
      //@ts-ignore
      document.getElementById("surname").value = data.surname;
      //@ts-ignore
      document.getElementById("patr").value = data.patronymic;
      // //@ts-ignore
      // document.getElementById("login").value = data.login;
      // //@ts-ignore
      // document.getElementById("password").value = data.password;
    }
    this.fetchRoles();
  }

  roles: any
  current_role = {id: 0, name: "Загрузка..."}
  fetchRoles() {
    this.sel_row.loadOn()
    this.cors.getRoles().subscribe((data) => {
      
      this.roles = data;
      if (this.is_edit) {
        //@ts-ignore
        for (let i = 0; i < data.length; i++) {
          if (this.roles[i].name == this.sel_row.getRow()[1].role) {
            this.current_role = this.roles[i]
            break;
          }
        }
      }
      else {
        this.current_role = this.roles[0];
      }
      this.sel_row.loadOff()
    }, (e) => {
      console.log(e);
      this.sel_row.loadOff()
    })
  }

  create() {
    this.sel_row.loadOn();
    const data = {
        //@ts-ignore
      name: document.getElementById("name").value,
        //@ts-ignore
      surname: document.getElementById("surname").value,
        //@ts-ignore
      patronymic: document.getElementById("patr").value,
        //@ts-ignore
      login: document.getElementById("login").value,
        //@ts-ignore
      password: document.getElementById("password").value,
      role: this.current_role.id
    }
    this.cors.createUser(data).subscribe(() => {
      this.sel_row.loadOff();
      this.sel_row.fetch();
    }, (e) => {
      alert(e);
      this.sel_row.loadOff();
    });
  }
  edit() {
    this.sel_row.loadOn();

    const data = {
      //@ts-ignore
    name: document.getElementById("name").value,
      //@ts-ignore
    surname: document.getElementById("surname").value,
      //@ts-ignore
    patronymic: document.getElementById("patr").value,
      //@ts-ignore
    login: document.getElementById("login").value,
      //@ts-ignore
    password: document.getElementById("password").value,
    role: this.current_role.id
  }
    this.cors.updateUser(this.sel_row.getRow()[1].id, data).subscribe(() => {
      this.sel_row.loadOff();
      this.sel_row.fetch();
      this.close.emit();
    }, (e) => {
      alert(e);
      this.sel_row.loadOff();
    });
  }

}
