import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  customer : Customer = new Customer() ;
  message : string = '';

  constructor(private customerService:CustomerService, private router : Router){}

  onSubmit(){
    this.customerService.addCustomer(this.customer).subscribe({
      next  :(response : string) =>{
        this.message=response;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.message = "Failed to add customer";
      }
    });
      
  }
}
