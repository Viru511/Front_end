import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  addScannedProducts(productIds: number[]): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload = JSON.stringify(productIds);
    console.log('Sending payload:', payload); // Debug log  
    return this.httpClient.post<string>(`${this.baseUrl}/product/scanned-products`, payload, { headers, responseType: 'text' as 'json' });
  }
  
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/product/${id}`);
  }

  getProductByNameKey(productKey: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/byName/${productKey}`);
  }

  createProduct(product : Product) : Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<string>(`${this.baseUrl}/product/createProduct` , product , {headers,responseType: 'text' as 'json'});
  }
  // calculateSubtotal(subtotal: number, productQuantities: { [productId: number]: number }): Observable<void> {
  //   const payload = { subtotal, productQuantities };
  //   console.log(payload);
  //   return this.httpClient.post<void>(`${this.baseUrl}/product/calculate-subtotal`, payload);
  // }
  // generateBill(): Observable<string> {
  //   return this.httpClient.get<string>(`${this.baseUrl}/product/generate-bill`, { responseType: 'text' as 'json' });
  // }

  

  generatePdf(data: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<string>(`${this.baseUrl}/product/generatePdf`, data, { headers, responseType: 'text' as 'json' });
  }
       
}

