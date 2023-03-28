import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RowsService {

  constructor() { }

  private row: any;
  getRow() {
    return this.row;
  }
  setRow(data:any) {
    this.row = data;
  }
  public fetchData$ = new Subject;
  fetch() {
    this.fetchData$.next(undefined);
  }
}
