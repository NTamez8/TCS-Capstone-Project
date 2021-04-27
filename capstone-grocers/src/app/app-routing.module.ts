//==MODULES==\\
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';
import { AdminPanelComponent } from './Components/admin/admin-panel/admin-panel.component';
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
import { ReportComponent } from './Components/admin/report/report.component';

import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';


import { UserPanelComponent } from './Components/user/user-panel/user-panel.component';
import { AdminGuard } from './Guards/admin.guard';
import { UserGuard } from './Guards/user.guard';
import { AddProductsComponent } from 'src/app/Components/admin/add-products/add-products.component';

import { DeleteProductsComponent } from 'src/app/Components/admin/delete-products/delete-products.component';
import { SignInComponent as AdminSignInComponent} from 'src/app/Components/admin/sign-in/sign-in.component';
import { UpdateProductsComponent } from 'src/app/Components/admin/update-products/update-products.component';
import { ViewProductsComponent } from 'src/app/Components/admin/view-products/view-products.component';
import { ViewRequestsComponent } from 'src/app/Components/admin/view-requests/view-requests.component';
import { NoLoginComponent } from './Components/no-login/no-login.component';
import { UserOptionsComponent } from './Components/user/user-options/user-options.component';
import { SelectItemComponent } from './Components/user/select-item/select-item.component';
import { ViewCartComponent } from './Components/user/view-cart/view-cart.component';
import { ViewOrderStatusComponent } from './Components/user/view-order-status/view-order-status.component';

import { CheckoutComponent } from './Components/user/checkout/checkout.component';
import { DeleteItemComponent } from './Components/user/delete-item/delete-item.component';

import { RaiseTicketComponent } from './Components/user/raise-ticket/raise-ticket.component'
import { EditProfileComponent as employeeEdit } from './Components/employee/edit-profile/edit-profile.component';
import { EditProfileComponent as userEdit } from './Components/user/edit-profile/edit-profile.component';
import { EmployeePanelComponent } from 'src/app/Components/employee/employee-panel/employee-panel.component';
import { OrderStatusComponent } from 'src/app/Components/employee/order-status/order-status.component';
import { SendRequestComponent } from 'src/app/Components/employee/send-request/send-request.component';
import { UnlockUsersComponent } from 'src/app/Components/employee/unlock-users/unlock-users.component';
import { SignInComponent as EmpSignInComponent} from 'src/app/Components/employee/sign-in/sign-in.component';
const routes: Routes = [
  {path:'',component:NoLoginComponent},
  {path:'user',component:UserOptionsComponent,children:[
    {path:'signUp',component:SignUpComponent},
    {path:'signIn',component:SignInComponent},
    {path:'raiseTicket',component:RaiseTicketComponent}

  //  {path:'userPanel',component:UserPanelComponent,canActivate:[UserGuard]},
    //{path:'raiseTicket',component:}
  ]},
  {path:'userPanel',component:UserPanelComponent,canActivate:[UserGuard],canActivateChild:[UserGuard],children:[
    {path:'selectItem',component:SelectItemComponent},
    {path:'deleteItem',component:DeleteItemComponent},
    {path:'viewCart',component:ViewCartComponent},
    {path:'checkout', component:CheckoutComponent},
 
    {path:'viewOrderStatus',component:ViewOrderStatusComponent},
    {path:'edit',component:userEdit}

  ]},
  {path:"employee",children:[
    {path:"signIn",component:EmpSignInComponent}
  ]},
  {path:"employeePanel",component:EmployeePanelComponent,children:[
    {path:"editProfile",component:employeeEdit},
    {path:"orderStatus",component:OrderStatusComponent},
    {path:"sendRequest",component:SendRequestComponent},
    {path:"unlockUsers",component:UnlockUsersComponent}
  ]},
  {path:"adminPanel",component:AdminPanelComponent,canActivate:[AdminGuard],canActivateChild:[AdminGuard],children:[
    {path:'addEmployee',component:AddEmployeeComponent},
    {path:'deleteEmployee',component:DeleteEmployeeComponent},
    {path:'generateReport',component:ReportComponent},
    {path:"addProducts",component:AddProductsComponent},
    {path:"viewProducts",component:ViewProductsComponent},
    {path:"updateProducts",component:UpdateProductsComponent},
    {path:"deleteProducts",component:DeleteProductsComponent},
    {path:"viewRequests",component:ViewRequestsComponent}
  ]},
  {path:"admin",children:[
    {path:"signIn",component:AdminSignInComponent}
  ]},
  {path:'**',redirectTo:'',pathMatch:'full'}
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }