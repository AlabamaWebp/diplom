import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductComponent2 } from './components/create/product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { MaterialComponent } from './components/material/material.component';
import { UserComponent } from './components/user/user.component';
import { UserComponent2 } from './components/create/user/user.component';
import { CreateComponent } from './components/create/create.component';
import { RowsService } from './shared/rows/rows.service';
import { MaterialComponent2 } from './components/create/material/material.component';
import { InspectorService } from './shared/inspector/inspector.service';
import { NumberDirective } from './shared/directives/number.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TableComponent,
    MaterialComponent,
    UserComponent,
    CreateComponent,
    MaterialComponent2,
    ProductComponent2,
    UserComponent2,
    NumberDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RowsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InspectorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
