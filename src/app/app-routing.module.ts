import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';

const routes :Routes=[
  {path:'',component:DashboardComponent},
  {path:'customer',component:ListCustomerComponent},
  {path:'help',component:HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
