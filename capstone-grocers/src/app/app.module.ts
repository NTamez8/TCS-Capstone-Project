import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPanelComponent } from './Components/user/user-panel/user-panel.component';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { SelectItemComponent } from './Components/user/select-item/select-item.component';
import { ViewCartComponent } from './Components/user/view-cart/view-cart.component';
import { ViewOrderStatusComponent } from './Components/user/view-order-status/view-order-status.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { CheckoutComponent } from './Components/user/checkout/checkout.component';
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
import { SignOutComponent } from './Components/admin/sign-out/sign-out.component';
@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    SignInComponent,
    SignUpComponent,
    SelectItemComponent,
    ViewCartComponent,
    ViewOrderStatusComponent,
    ProfileComponent,
    CheckoutComponent,
    AddEmployeeComponent,
    DeleteEmployeeComponent,
    SignOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
