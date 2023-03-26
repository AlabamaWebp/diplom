import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  create() {
    if (this.active = this.actions[0]) {
      this.cors.createPostavshik(
        {
          type: 1,
          name: "1",
          email: "2",
          telephone: "3",
          address: "4"
        }
      ).subscribe();
    }
  }
}
