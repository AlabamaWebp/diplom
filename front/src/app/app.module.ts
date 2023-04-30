import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule }   from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { MaterialComponent } from './components/material/material.component';
import { UserComponent } from './components/user/user.component';
import { CreateComponent } from './components/create/create.component';
import { RowsService } from './shared/rows/rows.service';
import { MaterialComponent2 } from './components/create/material/material.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TableComponent,
    MaterialComponent,
    UserComponent,
    CreateComponent,
    MaterialComponent2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
