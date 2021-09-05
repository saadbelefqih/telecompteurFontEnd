import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../shared/model/customer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
	private url:string=environment.customerApiUrl;
  constructor(private http:HttpClient) { }
  
  public getAllCustomers():Observable<Customer[]>{
	return this.http.get<Customer[]>(this.url+"/all");}

  public getOneCustomer(id:Number):Observable<Customer>{
    return this.http.get<Customer>(this.url+"/find/id/"+id);}

  public getCustomersByCine(p:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url+"/find/cine/"+p);}

  public getCustomersByFname(p:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url+"/find/fname/"+p);}

  public getCustomersByLname(p:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url+"/find/lname/"+p);}

  public getCustomersByJob(p:string):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url+"/find/job/"+p);}
	
  public addCustomer(customer:Customer):Observable<Customer>{
	return this.http.post<Customer>(this.url+"/add",customer);}
   
   public updateCustomer(customer:Customer):Observable<Customer>{
	return this.http.put<Customer>(this.url+"/update",customer);}
	
   public deleteCustomer(customerId:Number):Observable<void>{
	return this.http.delete<void>(this.url+"/delete/"+customerId);}
}
