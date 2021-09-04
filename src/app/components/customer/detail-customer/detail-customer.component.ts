import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { AppDataState } from 'src/app/shared/model/appdatastate.model';
import { Customer } from 'src/app/shared/model/customer.model';
import { DataStateEnum } from 'src/app/shared/model/datastate.model';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  customerId:number=-1;
  customerSelectedData$?:Observable<AppDataState<Customer>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private activatedRoute:ActivatedRoute,private  customerService:CustomerService) { }

  ngOnInit(): void {
    this.getParamId();
    this.getLoadCustomer(this.customerId);
  }

  getParamId(){
    this.customerId=parseInt(atob(this.activatedRoute.snapshot.params.id));
  }

  getLoadCustomer(id:number){
    this.customerSelectedData$=this.customerService.getOneCustomer(id)
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );

  }

}
