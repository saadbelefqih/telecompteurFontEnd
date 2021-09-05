import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/model/customer.model';
import { DataStateEnum } from 'src/app/shared/model/datastate.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerId:number=-1;
  step:number=0;
  customer:Customer={
    idCustomer:-1,
    fname:"",
	  lname:"",
    cine:"",
	  email:"",
    account_fb:"",
    account_insta:"",
    account_twitter:"",
    phone:"",
    jobtitle:"",
    address:"",
    subscriptionCode:"",
    imageUrl:"https://www.bootdey.com/img/Content/avatar/avatar7.png"
  }
  defaultPhoto:string="";
  readonly DataStateEnum=DataStateEnum;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private  customerService:CustomerService) { }

  ngOnInit(): void {
    this.getParamId();
    this.getLoadCustomer(this.customerId);
  }

  getParamId(){
    this.customerId=parseInt(atob(this.activatedRoute.snapshot.params.id));
  }

  getLoadCustomer(id:number){
      if(id>0){
        this.customerService.getOneCustomer(id)
      .subscribe(c=>{this.customer=c;})
      }
  }

  nexStep(i:number){
    this.step=i}

  previousStep(i:number){
    this.step--;
  }

  changePhoto(){
    this.customer.imageUrl=this.defaultPhoto;
  }




  onSubmit(form:any){
    
    this.customerService.updateCustomer(this.customer).subscribe((rep)=>{
      Swal.fire({
        title:'Félicitations!',
        text:'opération a bien été effectuée.',
        icon:'success',
        showCloseButton: false,
      }).then(()=>{
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

}
