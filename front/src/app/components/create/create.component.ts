import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() { }

  @Output() close = new EventEmitter();

  ngOnInit(): void {
    
  }

  actions = [
    "Материал",
    "Продукт",
    "Пользователь",
  ]

  active = "";

  create(str: string) {
    this.active = str;
  }

  goBack() {
    this.active = "";
  }

}
