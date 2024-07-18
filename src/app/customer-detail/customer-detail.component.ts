import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Session } from 'node:inspector';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
    keyword: string = '';
    customers:Customer[]=[];
    selectedCustomerName: string = '';
    customerSuggestions: Customer[] = []; // change for new flow
    selectedCustomer: Customer | null = null;
    @Output() customerSelected = new EventEmitter<Customer>();
    constructor(private customerService:CustomerService){}

    ngOnInit():void{
     
    }
    // public searchCustomer(keyword: string): void {
    //   this.customerService.searchCustomer(keyword).subscribe(data => {
    //     this.customers = data;
    //     if (this.customers.length > 0) {
    //       this.selectedCustomerName = this.customers[0].customerName + ' ' + this.customers[0].village;
    //       this.selectedCustomer=this.customers[0];
    //     }
  
    //   });
    // }
    // public onCustomerSelect(event: Event): void {
    //   const target = event.target as HTMLSelectElement;
    //   this.selectedCustomerName = target.value;
    //   this.selectedCustomer = this.customers.find(customer => 
    //     `${customer.customerName} ${customer.village}` === this.selectedCustomerName
    //   ) || null;
    //   console.log(this.selectedCustomerName); // For debugging, remove or handle as needed
    // }

    //new flow
    public searchCustomer(): void { // change for new flow
      if (this.keyword.length > 2) {
        this.customerService.searchCustomer(this.keyword).subscribe(data => {
          this.customerSuggestions = data;
        });
      } else {
        this.customerSuggestions = [];
      }
    }

    // method to select a customer from suggestions
    public selectCustomer(customer: Customer): void { // change for new flow
      this.selectedCustomer = customer;
      this.selectedCustomerName = customer.customerName + ' ' + customer.village;
      this.customerSuggestions = [];
      this.keyword = '';
      this.customerSelected.emit(customer);
      
      

    }
}
