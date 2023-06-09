import { Injectable } from '@angular/core';
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
  private is_load = false;
  loadOn() {
    this.is_load = true;
  }
  loadOff() {
    this.is_load = false;
  }
  checkLoad() {
    return this.is_load;
  }
  setRow(data:any) {
    this.row = data;
  }
  public fetchData$ = new Subject;
  fetch() {
    this.fetchData$.next(undefined);
  }
  private show_user = false
  setUserRights(value: boolean) {
    this.show_user = value
  }
  getUserRights() {
    return this.show_user
  }

}
