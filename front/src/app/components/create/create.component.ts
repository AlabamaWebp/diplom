import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { delay, retry } from 'rxjs';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private cors: CorsService) { }

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
  }

  goBack() {
    this.active = "";
  }

  create(data: any = {}) {
    if (this.active = this.actions[1]) {
      this.cors.matCreate(
        {
          //@ts-ignore
          Name: document.getElementById("mat_name")?.value,
          //@ts-ignore
          Purchased: document.getElementById("email")?.value,
          //@ts-ignore
          PostavshikId: this.currentPostNames.id == 0 ? null : this.currentPostNames.id,
          //@ts-ignore
          TypeId: currentMatTypes.id,
          //@ts-ignore
          Count: document.getElementById("count")?.value,
        }
      ).subscribe(() => {
        this.goBack();
      });
    }
  }
}
