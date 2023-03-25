import { Component, OnInit } from '@angular/core';
import { CorsService } from 'src/app/shared/crud/product/cors.service';

@Component({
  selector: 'app-tables',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private cors: CorsService) { }

  ngOnInit(): void {
    this.fetchData();
    console.log(this.material);
    
  }

  material: any

  fetchData() {
    this.cors.matAll().subscribe((data) => {
      this.material = data
    })
  }

}
