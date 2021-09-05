import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { DetailCustomerComponent } from './components/customer/detail-customer/detail-customer.component';
import { NewCustomerComponent } from './components/customer/new-customer/new-customer.component';

const routes :Routes=[
  {path: "",redirectTo: '/dashboard',pathMatch: 'full'},
  {path:"dashboard",component:DashboardComponent},
  {path:'customer',component:ListCustomerComponent},
  {path:"customer/details/:id",component:DetailCustomerComponent},
  {path:"customer/new",component:NewCustomerComponent},
  {path:'help',component:HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
