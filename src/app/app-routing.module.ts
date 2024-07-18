import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombinedFormComponent } from './combined-form/combined-form.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  { path: '', component: CombinedFormComponent },
  { path: 'add-product', component: CreateProductComponent },
  {path: 'add-customer', component: AddCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
