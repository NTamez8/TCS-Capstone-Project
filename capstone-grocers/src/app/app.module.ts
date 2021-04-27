//==MODULES==\\
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http'
//==COMPONENTS==\\
import { AppComponent } from './app.component';
//USER
import { UserPanelComponent } from './Components/user/user-panel/user-panel.component';
import { SignInComponent as UserSignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import {LogOutComponent as userLogOut} from './Components/user/log-out/log-out.component';
import { SelectItemComponent } from './Components/user/select-item/select-item.component';
import { ViewCartComponent } from './Components/user/view-cart/view-cart.component';
import { ViewOrderStatusComponent } from './Components/user/view-order-status/view-order-status.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { CheckoutComponent } from './Components/user/checkout/checkout.component';



// import { EmployeeComponent } from './employee/employee.component';
//EMPLOYEE
import { OrderStatusComponent } from './Components/employee/order-status/order-status.component';
import { SendRequestComponent } from './Components/employee/send-request/send-request.component';
import { EditProfileComponent } from './Components/employee/edit-profile/edit-profile.component';
import { UnlockUsersComponent } from './Components/employee/unlock-users/unlock-users.component';
import { LogOutComponent } from './Components/employee/log-out/log-out.component';



import { LogOutComponent as EmpLogOutComponent } from './Components/employee/log-out/log-out.component';
import { SignInComponent as EmpSignInComponent } from './Components/employee/sign-in/sign-in.component';
//ADMIN
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';;
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
import { AddProductsComponent } from './Components/admin/add-products/add-products.component';
import { ViewProductsComponent } from './Components/admin/view-products/view-products.component';
import { DeleteProductsComponent } from './Components/admin/delete-products/delete-products.component';
import { UpdateProductsComponent } from './Components/admin/update-products/update-products.component';
import { ViewRequestsComponent } from './Components/admin/view-requests/view-requests.component';
import { AdminPanelComponent } from './Components/admin/admin-panel/admin-panel.component';
import { SignInComponent as AdminSignInComponent } from './Components/admin/sign-in/sign-in.component';









import { SignOutComponent } from './Components/admin/sign-out/sign-out.component';


import { SignOutComponent as AdminSignOutComponent} from './Components/admin/sign-out/sign-out.component';
import { ReportComponent } from './Components/admin/report/report.component';
import { ReportTableComponent } from './Components/admin/report-table/report-table.component';
import { NoLoginComponent } from './Components/no-login/no-login.component';
import { UserOptionsComponent } from './Components/user/user-options/user-options.component';
import {EditProfileComponent as userEdit} from './Components/user/edit-profile/edit-profile.component';
import { RaiseTicketComponent } from './Components/user/raise-ticket/raise-ticket.component';
import { FundsComponent } from './Components/user/funds/funds.component';
import { DeleteItemComponent } from './Components/user/delete-item/delete-item.component';
import { FormsModule } from '@angular/forms';
import { EmployeePanelComponent } from './Components/employee/employee-panel/employee-panel.component';
import { ProductManagementComponent } from './Components/admin/product-management/product-management.component';
@NgModule({
  declarations: [
    //==COMPONENTS==\\
    AppComponent,
    //USER
    UserPanelComponent,
    UserSignInComponent,
    SignUpComponent,
    SelectItemComponent,
    ViewCartComponent,
    ViewOrderStatusComponent,
    ProfileComponent,
    CheckoutComponent,
    //EMPLOYEE
    AddEmployeeComponent,
    DeleteEmployeeComponent,

   // EmployeeComponent,

    

    // EmployeeComponent,
   
   
    userLogOut,
    
    userEdit,

  

    EmpSignInComponent,
    EmpLogOutComponent,
    //DeleteEmployeeComponen,
    //ADMIN
    AdminSignInComponent,
    AdminPanelComponent,
  
 
    AddProductsComponent,
    ViewProductsComponent,
    DeleteProductsComponent,
    UpdateProductsComponent,
    ReportComponent,
    ViewRequestsComponent,
  
  
    ReportTableComponent,
    NoLoginComponent,
    UserOptionsComponent,

   // DeleteEmployeeComponent


    AdminSignOutComponent,
    RaiseTicketComponent,
    // EmployeeComponent,
    OrderStatusComponent,
    SendRequestComponent,
    EditProfileComponent,
    UnlockUsersComponent,
    LogOutComponent,
    SignOutComponent,
    ReportComponent,
    FundsComponent,
        
    DeleteItemComponent,
    EmployeePanelComponent,
    ProductManagementComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 FormsModule,
    HttpClientModule,

  ],
  providers: [ViewProductsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
