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
import { RaiseTicketComponent } from './Components/user/raise-ticket/raise-ticket.component';
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
    {path:'select',component:SelectItemComponent},
    {path:'viewCart',component:ViewCartComponent},
    {path:'viewOrderStatus',component:ViewOrderStatusComponent}

  ]},
  {path:'admin',component:AdminPanelComponent,canActivate:[AdminGuard],children:[
    {path:'addEmployee',component:AddEmployeeComponent},
    {path:'deleteEmployee',component:DeleteEmployeeComponent},
    {path:'generateReport',component:ReportComponent}
  ]},
   //must use path:"\x/y" for the pages to properly load
  //ADMIN
  {path:"\admin/signIn",component:AdminSignInComponent},
  {path:"\admin/addProducts",component:AddProductsComponent},
  {path:"\admin/viewProducts",component:ViewProductsComponent},
  {path:"\admin/updateProducts",component:UpdateProductsComponent},
  {path:"\admin/deleteProducts",component:DeleteProductsComponent},
  {path:"\admin/viewRequests",component:ViewRequestsComponent},
  {path:"\admin/panel",component:AdminPanelComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
