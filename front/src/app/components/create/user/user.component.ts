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
  }

  create() {
    this.sel_row.loadOn();
    const data = {
      // name = document.getElementById("").value
      // surname = document.getElementById("").value
      // patronymic = document.getElementById("").value
      // login = document.getElementById("").value
      // password = document.getElementById("").value
      // role = document.getElementById("").value
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
      Name: document.getElementById("mat_name")?.value,
      //@ts-ignore
      Purchased: document.getElementById("pok")?.checked,

      TypeId: this.currentMatTypes.id,
      //@ts-ignore
      Count: document.getElementById("colvo")?.value,
    }
    this.cors.matEdit(this.sel_row.getRow()[1].mat_id, data).subscribe(() => {
      this.sel_row.loadOff();
      this.sel_row.fetch();
      this.close.emit();
    }, (e) => {
      alert(e);
      this.sel_row.loadOff();
    });
  }

}
