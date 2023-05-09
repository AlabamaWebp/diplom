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
    console.log(this.sel_row.getUserRights());
    
    !this.sel_row.getUserRights() ? this.actions = ["Материал","Продукт","Пользователь",] : this.actions = [ "Материал", "Продукт" ];
  }

  // osnova
  actions: string[] = []

  actionClick(str: string) {
    this.mchange.emit((this.actions.indexOf(str)+1)*2-1);
    
  }
}
