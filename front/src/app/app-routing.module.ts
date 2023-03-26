import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './components/material/material.component';
import { PostavshikComponent } from './components/postavshik/postavshik.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'user', component: UserComponent },
  { path: 'post', component: PostavshikComponent },
  { path: '**', redirectTo: "/product" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
