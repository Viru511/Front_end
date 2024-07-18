import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  
  private baseUrl= "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  searchCustomer(keyword: string):Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/billing/key/${keyword}`);
  }

  addCustomer(customer : Customer): Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<string>(`${this.baseUrl}/billing/add-customer`, customer ,{headers,responseType : 'text' as 'json'}  );

  }
}
