//==MODULES==\\
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
//==COMPONENTS==\\
import { AppComponent } from './app.component';
//USER
import { UserPanelComponent } from './Components/user/user-panel/user-panel.component';
import { SignInComponent as UserSignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { SelectItemComponent } from './Components/user/select-item/select-item.component';
import { ViewCartComponent } from './Components/user/view-cart/view-cart.component';
import { ViewOrderStatusComponent } from './Components/user/view-order-status/view-order-status.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { CheckoutComponent } from './Components/user/checkout/checkout.component';
//EMPLOYEE
import { OrderStatusComponent } from './Components/employee/order-status/order-status.component';
import { SendRequestComponent } from './Components/employee/send-request/send-request.component';
import { UnlockUsersComponent } from './Components/employee/unlock-users/unlock-users.component';
import { EditProfileComponent } from './Components/employee/edit-profile/edit-profile.component';
import { LogOutComponent as EmpLogOutComponent } from './Components/employee/log-out/log-out.component';
import { SignInComponent as EmpSignInComponent } from './Components/employee/sign-in/sign-in.component';
//ADMIN
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';;
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
import { AddProductsComponent } from './Components/admin/add-products/add-products.component';
import { DeleteProductsComponent } from './Components/admin/delete-products/delete-products.component';
import { UpdateProductsComponent } from './Components/admin/update-products/update-products.component';
import { ViewRequestsComponent } from './Components/admin/view-requests/view-requests.component';
import { AdminPanelComponent } from './Components/admin/admin-panel/admin-panel.component';
import { SignInComponent as AdminSignInComponent } from './Components/admin/sign-in/sign-in.component';
import { SignOutComponent as AdminSignOutComponent} from './Components/admin/sign-out/sign-out.component';
import { ReportComponent } from './Components/admin/report/report.component';
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
    OrderStatusComponent,
    SendRequestComponent,
    UnlockUsersComponent,
    EditProfileComponent,
    EmpSignInComponent,
    EmpLogOutComponent,
    //DeleteEmployeeComponen,
    //ADMIN
    AdminSignInComponent,
    AdminPanelComponent,
    AddEmployeeComponent,
    DeleteEmployeeComponent,
    AddProductsComponent,
    DeleteProductsComponent,
    UpdateProductsComponent,
    ReportComponent,
    ViewRequestsComponent,
    AdminSignOutComponent,
    ReportComponent
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
