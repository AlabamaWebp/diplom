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
  // fetch data zaranee
  private only_product: any
  getProdMaterials() {
    return this.only_product;
  }
  setProdMaterials(value: any) {
    this.only_product = value;
  }

  private only_roles: any
  getRoles() {
    return this.only_roles;
  }
  setRoles(value: any) {
    this.only_roles = value;
  }

  private only_mat_types: any
  getMatTypes() {
    return this.only_mat_types;
  }
  setMatTypes(value: any) {
    this.only_mat_types = value;
  }
  // fetch data zaranee

}
