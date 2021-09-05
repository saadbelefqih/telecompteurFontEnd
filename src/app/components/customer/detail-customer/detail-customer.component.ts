import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { AppDataState } from 'src/app/shared/model/appdatastate.model';
import { Customer } from 'src/app/shared/model/customer.model';
import { DataStateEnum } from 'src/app/shared/model/datastate.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  customerId:number=-1;
  customerSelectedData$?:Observable<AppDataState<Customer>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private activatedRoute:ActivatedRoute,private  customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.getParamId();
    this.getLoadCustomer(this.customerId);
  }

  onRedirectCustomEdit(id:any){
    this.router.navigateByUrl("/customer/edit/"+btoa(id));
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

  deleteCustomer(){
    Swal.fire({
      title: 'êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'OUI, Supprime-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(this.customerId).subscribe((rep)=>{
          Swal.fire(
            'Supprimé !',
            'enregistrement a été supprimé .',
            'success'
          ).then(()=>{
            this.router.navigate(['/customer']);
          })
        },(error)=>{
          Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: "Ereur d'envoie,Merci de resseyer !",
          timer: 3000
          })
        }
        )
        
      }
    })
  }

}
