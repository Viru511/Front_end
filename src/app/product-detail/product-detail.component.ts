import { Component, EventEmitter, Output, output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  productIdsInput: string = '';
  productIds: number[] = [];
  products: Product[] = [];
  subtotal: number = 0;
  productSuggestions: Product[] = [];
  productKey: number = 0;
  productNameKey :string ='';
  selectedProduct: Product | null = null;
  selectedproductName: string = '';
  quantities: { [productId: number]: number } = {};
  billMessage: string = '';
  @Output() productUpdated = new EventEmitter<Product[]>();
  @Output() quantityChanged = new EventEmitter<{ productId: number, quantity: number }>();
  


 // @Output() updatedSubTotal = new EventEmitter<number>();


  constructor(private productService: ProductService) {}

  parseProductIds(input: string): number[] {
    return input.split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  }

  addScannedProducts() {
    this.productIds = this.parseProductIds(this.productIdsInput);
    this.productService.addScannedProducts(this.productIds).subscribe({
      next: (response: string) => {
        console.log('Products added successfully:', response);
        this.getProducts();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  searchProduct(): void {
    if (this.productKey > 0) {
      this.productService.getProductById(this.productKey).subscribe({
        next: (data: Product) => {
          this.productSuggestions = [data];
          console.log(data); // Assuming getProductById returns a single product
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.productSuggestions = [];
        }
      });
    } else {
      this.productSuggestions = [];
    }
  }

 searchProductByNameKey(): void { // change for new flow
    if (this.productNameKey.length > 0) {
      this.productService.getProductByNameKey(this.productNameKey).subscribe(data => {
        this.productSuggestions = data;
      });
    } else {
      this.productSuggestions = [];
    }
  }
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.selectedproductName = product.name + ' ' + product.price;
    this.productSuggestions = [];
    this.productKey = 0;
    
    // Add the selected product to the products array
    if (!this.products.find(p => p.id === product.id)) {
      this.products.push(product);
      this.quantities[product.id] = 1;
      this.productUpdated.emit(this.products);
      this.quantityChanged.emit({ productId: product.id, quantity: 1 }); // Default quantity to 1
      this.calculateSubtotal();
      //this.updateProducts();
    }
  }

  // updateProducts():void{
  //   this.productUpdated.emit(this.products);
  //  // this.updatedSubTotal.emit(this.subtotal);
  // }

  getProducts() {
    this.products = []; // Clear the current products list
    this.quantities = {}; // Clear the quantities
    const uniqueProductIds = Array.from(new Set(this.productIds));

    uniqueProductIds.forEach(id => {
      this.productService.getProductById(id).subscribe({
        next: (data: Product) => {
          this.products.push(data);
          this.quantities[data.id] = 1; // Default quantity to 1
          this.calculateSubtotal();
         
        },
        error: (error) => {
          console.error(`Error fetching product with ID ${id}:`, error);
        }
      });
    });
  }

  onQuantityChange(productId: number, quantity: number) {
    this.quantities[productId] = quantity;
    this.quantityChanged.emit({ productId, quantity });
     this.calculateSubtotal();
    // console.log("hello");
    // this.getSubTotal();
    // this.updateProducts();
  }

  calculateSubtotal() {
    
    this.subtotal = this.products.reduce((acc, product) => {
      return acc + (product.price * (this.quantities[product.id] || 1));
    }, 0);

    //this.updateProducts();
    
  }

  // getSubTotal() {
  //   console.log("into gettotal");
  //   console.log(this.subtotal);
  //   console.log(this.quantities);
  //   this.productService.calculateSubtotal(this.subtotal, this.quantities).subscribe({
  //     next: () => {
  //       console.log("Subtotal sent successfully");
  //     },
  //     error: (error) => {
  //       console.log("Error sending subtotal", error);
  //     }
  //   });          
  // }

  removeProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
    delete this.quantities[productId];
    this.productUpdated.emit(this.products);
    this.quantityChanged.emit({ productId, quantity: 0 });
    this.calculateSubtotal();
    console.log(this.products);
  }

 
  // generateBill() {
  //   this.productService.generateBill().subscribe({
  //     next: (response: string) => {
  //       this.billMessage = response;
  //     },
  //     error: (error) => {
  //       console.error('Error generating bill:', error);
  //       this.billMessage = 'Failed to generate bill.';
  //     }
  //   });
  // }
}
