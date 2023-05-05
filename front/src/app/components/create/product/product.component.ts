import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorsService } from 'src/app/shared/crud/product/cors.service';
import { RowsService } from 'src/app/shared/rows/rows.service';

@Component({
  selector: 'create-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent2 implements OnInit {


  @Input() is_edit = false;
  @Output() close = new EventEmitter();
  @Output() mchange = new EventEmitter();
  title = "Создание";
  constructor(private cors: CorsService, private sel_row: RowsService) { }
  ngOnInit(): void {
    if (this.is_edit) {
      this.title = "Изменение";
      const data = this.sel_row.getRow()[1];
      console.log(data);
      
      //@ts-ignore
      document.getElementById("mat_name").value = data.name;
      //@ts-ignore
      document.getElementById("colvo").value = data.count;
    }
    this.fetchMat()
  }
  goBack() {
    this.mchange.emit(0);
  }

  create() {
    // material
    this.sel_row.loadOn();
    const data = {
      //@ts-ignore
      name: document.getElementById("mat_name")?.value,
      //@ts-ignore
      count: document.getElementById("colvo")?.value,
    }
    console.log(data);
    this.cors.prodCreate(data).subscribe(() => {
      this.sel_row.loadOff();
      this.sel_row.fetch();
    }, (e) => {
      alert(e);
      this.sel_row.loadOff();
    });
  }
  edit() {
    this.sel_row.loadOn();

    const data = {
      //@ts-ignore
      name: document.getElementById("mat_name").value,
      //@ts-ignore
      count: document.getElementById("colvo").value,
    }
    console.log(data);
    
    //@ts-ignore
    this.cors.prodUpdate(this.sel_row.getRow()[1].id, data).subscribe(() => {
      this.sel_row.loadOff();
      this.sel_row.fetch();
      this.close.emit();
    }, (e) => {
      alert(e);
      this.sel_row.loadOff();
    });
  }

  selected_items: string[] = []
  data: any;
  fetchMat() {
    
    this.sel_row.loadOn();
    this.cors.matAll().subscribe((d) => {
      this.data = d;
      this.cors.matProd(this.sel_row.getRow()[1].id).subscribe((d2: any) => {
        for (let i = 0; i < d2.length; i++) {
          this.selected_items.push(d2[i]["mat_id"]);
          console.log(this.selected_items, d2);
          
        }
        this.sel_row.loadOff();
      }, (e) => {
        console.log(e);
        this.sel_row.loadOff();
      })
    }, (e) => {
      console.log(e);
      this.sel_row.loadOff();
    })
  }
  checkboxes: any[] = [];
  checkBoxClick(cbox: HTMLInputElement, data: any) {
    cbox.checked = !cbox.checked;
    const check = cbox.checked;
    // console.log(data); // mat_id, mat_name, cbox.checked
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (this.checkboxes[i]["mat_id"] == data.mat_id) {
        this.checkboxes.splice(i,1);
        return
      }
    }
    this.checkboxes.push({"mat_id": data.mat_id, "mat_name": data.mat_name, "checked": check});
    console.log(this.checkboxes);
   }
}
