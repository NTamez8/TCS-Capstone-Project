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
import { updateProfileComponent } from './Components/user/edit-profile/edit-profile.component';
import { CheckoutComponent } from './Components/user/checkout/checkout.component';
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
// import { EmployeeComponent } from './employee/employee.component';
import { OrderStatusComponent } from './Components/employee/order-status/order-status.component';
import { SendRequestComponent } from './Components/employee/send-request/send-request.component';
import { EditProfileComponent } from './Components/employee/edit-profile/edit-profile.component';
import { UnlockUsersComponent } from './Components/employee/unlock-users/unlock-users.component';
import { LogOutComponent } from './Components/employee/log-out/log-out.component';
import { SignOutComponent } from './Components/admin/sign-out/sign-out.component';
import { ReportComponent } from './Components/admin/report/report.component';
import { FundsComponent } from './Components/user/funds/funds.component';
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
    updateProfileComponent,
    // EmployeeComponent,
    OrderStatusComponent,
    SendRequestComponent,
    EditProfileComponent,
    UnlockUsersComponent,
    LogOutComponent,
    SignOutComponent,
    ReportComponent,
    FundsComponent
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
