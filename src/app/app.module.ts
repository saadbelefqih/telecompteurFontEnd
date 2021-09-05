import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailCustomerComponent } from './components/customer/detail-customer/detail-customer.component';
import { FormsModule } from '@angular/forms';
import { NewCustomerComponent } from './components/customer/new-customer/new-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListCustomerComponent,
    DashboardComponent,
    HelpComponent,
    DetailCustomerComponent,
    NewCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
