import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() data: any = []
  @Input() header: string[] = []
  @Input() header_name: string[] = []
  @Input() title: string = "";
  @Input() clickable: boolean = false;
  @Input() date_col: string[] = []
  @Output() row_click = new EventEmitter()

  selected: any;

  ngOnInit(): void {
  }

  clickRow(data: any) {
    this.row_click.emit(data);
    this.selected = data;
  }

}
