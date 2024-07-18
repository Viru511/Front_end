import { Component} from '@angular/core';
import { Customer } from '../customer';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combined-form',
  templateUrl: './combined-form.component.html',
  styleUrl: './combined-form.component.css'
})


export class CombinedFormComponent {

  
  customerDetails: Customer | null = null;
  products: Product[] = [];
  quantities: { [productId: number]: number } = {};
  subtotal: number = 0;
  billMessage: string = '';
  isProcessed :boolean = false;

  constructor(private productService: ProductService) {}
  // navigateToCreateProduct() {
  //   this.router.navigate(['/create']); // Navigate to '/create' route
  // }

  handleCustomerSelected(customer :Customer) : void{
    this.customerDetails=customer;
  }
  handleProductUpdated(products : Product[]) : void {
    this.products = products;
  }

  handleQuantityChanged(data: { productId: number, quantity: number }): void {
    this.quantities[data.productId] = data.quantity;
    this.updateSubtotal();
  }

  updateSubtotal(): void {
    this.subtotal = this.products.reduce((acc, product) => {
      return acc + (product.price * (this.quantities[product.id] || 1));
    }, 0);
  }
  generatePdf(){
    const formData = {
      customer: this.customerDetails,
      product: this.products,
      quantities: this.quantities,
      subTotal: this.subtotal
    };
    console.log('FormData to be sent to backend:', JSON.stringify(formData));
    this.productService.generatePdf(formData).subscribe({
      next: (response: string) => {
              this.billMessage = response;
     },
      error: (error) => {
        console.error('Error generating bill:', error);
        this.billMessage = 'Failed to generate bill.';
      }
    });
  }

  processForm(): void{
    this.isProcessed = true;
  }

}
