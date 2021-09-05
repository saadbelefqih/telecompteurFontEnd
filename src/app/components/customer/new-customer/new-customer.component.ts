import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/model/customer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
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
  step:number=0;
  stepIntitule:string[]=["Général","Info","Liens sociaux"];
  constructor(private router:Router,private customerService:CustomerService) { }

  ngOnInit(): void {
    
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
    
    this.customerService.addCustomer(this.customer).subscribe((rep)=>{
      Swal.fire({
        title:'Félicitations!',
        text:'Vous étés desormais Participant.',
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
