import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith,map } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { AppDataState } from 'src/app/shared/model/appdatastate.model';
import { Customer } from 'src/app/shared/model/customer.model';
import { DataStateEnum } from 'src/app/shared/model/datastate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customersData$?:Observable<AppDataState<Customer[]>>;
  isCardForm:boolean=true;
  readonly DataStateEnum=DataStateEnum;
  searchValue:string="";
  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.isCardForm=true;
    this.leadCustomers();
    
  }

  leadCustomers(){
    this.customersData$=this.customerService.getAllCustomers()
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  getTableForm(){
    this.isCardForm=false;
  }

  getCardForm(){
    this.isCardForm=true;
  }

  onRedirectCustomDetails(id:any){
    this.router.navigateByUrl("/customer/details/"+btoa(id));
  }

  getCustomersByCine(){
    if(this.searchValue.length>0){
    this.customersData$=this.customerService.getCustomersByCine(this.searchValue)
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
    }
  }

  getCustomersByFname(){
    if(this.searchValue.length>0){
    this.customersData$=this.customerService.getCustomersByFname(this.searchValue)
    .pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
    }
  }
  getCustomersByLname(){
    if(this.searchValue.length>0){
      this.customersData$=this.customerService.getCustomersByLname(this.searchValue)
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
    }

  }

  getCustomersByJob(){
    if(this.searchValue.length>0){
      this.customersData$=this.customerService.getCustomersByJob(this.searchValue)
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
      }
    }

}
