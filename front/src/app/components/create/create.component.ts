import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private cors: CorsService, private sel_row: RowsService) { }

  @Output() close = new EventEmitter();
  @Output() mchange = new EventEmitter();
  ngOnInit(): void {
    // this.is_edit? this.title = "Изменение" : 0;

    // // this.active != "" ? this.actionClick(this.active) : 0;
    // if (this.active !== "") {
    //   this.actionClick(this.active)
    //   this.name = this.sel_row.getRow()[1].mat_name;
      
    // }
  }

  // osnova
  actions = [
    "Материал",
    "Продукт",
    "Пользователь",
  ]

  actionClick(str: string) {
    this.mchange.emit((this.actions.indexOf(str)+1)*2-1);
    
  }

  // create() {
  //   // material
  //   if (this.active = this.actions[0]) {
  //     const data = {
  //       //@ts-ignore
  //       Name: document.getElementById("mat_name")?.value,
  //       //@ts-ignore
  //       Purchased: document.getElementById("pok")?.checked,

  //       TypeId: this.currentMatTypes.id,
  //       //@ts-ignore
  //       Count: document.getElementById("colvo")?.value,
  //     }
  //     console.log(data);
  //     this.cors.matCreate(data).subscribe(() => {
  //       this.goBack();
  //       this.sel_row.fetch();
  //     });
  //   }
  //   // prod
  //   if (this.active = this.actions[1]) {
  //     const data = {
  //       //@ts-ignore
  //       Name: document.getElementById("name")?.value,
  //       //@ts-ignore
  //       Count: document.getElementById("colvo")?.value,
  //     }
  //     console.log(this.sel_row.getRow()[1].id, data);
  //     this.cors.prodUpdate(this.sel_row.getRow()[1].id, data).subscribe(() => {
  //       this.goBack();
  //       this.sel_row.fetch();
  //     });
  //   }
  // }
  // edit() {
  //   // material
  //   if (this.active = this.actions[0]) {
  //     const data = {
  //       //@ts-ignore
  //       Name: document.getElementById("mat_name")?.value,
  //       //@ts-ignore
  //       Purchased: document.getElementById("pok")?.checked,

  //       TypeId: this.currentMatTypes.id,
  //       //@ts-ignore
  //       Count: document.getElementById("colvo")?.value,
  //     }
  //     console.log(this.sel_row.getRow()[1], data);
      
  //     this.cors.matEdit(this.sel_row.getRow()[1].mat_id, data).subscribe(() => {
  //       this.sel_row.fetch();
  //       this.close.emit();
  //     });
  //   }
  // }
}
