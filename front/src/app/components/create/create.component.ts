import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  ngOnInit(): void {
    
  }

  // material
  matTypes: any;
  currentMatTypes = {
    id: 1,
    name: "Загрузка..."
  }

  purchased = 0;
  fetchMatData() {
    this.cors.matTypes().pipe(retry(5),delay(1500)).subscribe((data) => {
      this.matTypes = data;
      this.currentMatTypes = this.matTypes[0];
    });
  }

  // osnova
  actions = [
    "Материал",
    "Продукт",
    "Пользователь",
  ]

  active = "";

  actionClick(str: string) {
    this.active = str;
    if (this.active == "Материал")
      this.fetchMatData();
  }

  goBack() {
    this.active = "";
  }

  create() {
    if (this.active = "Материал") {
      const data =  {
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
        this.goBack();
        this.sel_row.fetch();
      });
    }
  }
}
