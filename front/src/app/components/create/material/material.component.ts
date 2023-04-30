import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'create-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent2 implements OnInit {

  constructor(private cors: CorsService, private sel_row: RowsService) { }

  @Input() is_edit = false;
  @Output() close = new EventEmitter();
  @Output() mchange = new EventEmitter();
  title = "Создание";

  ngOnInit(): void {
    if (this.is_edit) {
      this.title = "Изменение";
      console.log(this.sel_row.getRow())
      const data = this.sel_row.getRow()[1];
      //@ts-ignore
      document.getElementById("mat_name").value = data.mat_name;
      //@ts-ignore
      document.getElementById("pok").checked = data.mat_purchased;
      //@ts-ignore
      document.getElementById("colvo").value = data.mat_count;
      this.fetchMatData(data.mat_type);
    }
    else {
      this.fetchMatData()
    }
  }
  goBack() {
    this.mchange.emit(0);
  }

  matTypes: any;
  currentMatTypes = {
    id: 1,
    name: "Загрузка..."
  }

  purchased = 0;
  fetchMatData(mat: any = "") {
    this.cors.matTypes().subscribe((data) => {
      this.matTypes = data;
      if (this.is_edit) {
        for (let i = 0; i < this.matTypes.length; i++) {
          if (this.matTypes[i].name == mat) {
            this.currentMatTypes = this.matTypes[i]
            break;
          }
        }
      }
      else {
        this.currentMatTypes = this.matTypes[0];
      }
    });
  }
  create() {
    // material
    const data = {
      //@ts-ignore
      Name: document.getElementById("mat_name")?.value,
      //@ts-ignore
      Purchased: document.getElementById("pok")?.checked,
      
      TypeId: this.currentMatTypes.id,
      //@ts-ignore
      Count: document.getElementById("colvo")?.value,
    }
    console.log(data);
    this.cors.matCreate(data).subscribe(() => {
      this.sel_row.fetch();
    }, (e) => {
      alert(e);
    });
  }
  edit() {
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
      this.sel_row.fetch();
      this.close.emit();
    }, (e) => {
      alert(e);
    });
  }
}
