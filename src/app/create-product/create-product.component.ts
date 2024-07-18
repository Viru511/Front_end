import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  message :string="";
  product: Product = new Product();

  constructor(private productService :ProductService, private router :Router){}
  ngOnInit(): void {
    console.log('CreateProductComponent initialized');
  }

  onSubmit(){
    this.productService.createProduct(this.product).subscribe({  
      next: (response: string) => {
        this.message = response;
        setTimeout(() =>{ this.router.navigate(['/']);},2000);
      },
      error: (error) => {
        console.error('Error generating bill:', error);
        this.message = 'Failed to create product.';
      }
    });
  
  }
}
