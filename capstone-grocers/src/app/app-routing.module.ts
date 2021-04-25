import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './Components/admin/add-employee/add-employee.component';
import { AdminPanelComponent } from './Components/admin/admin-panel/admin-panel.component';
import { DeleteEmployeeComponent } from './Components/admin/delete-employee/delete-employee.component';
import { ReportComponent } from './Components/admin/report/report.component';
import { NoLoginComponent } from './Components/no-login/no-login.component';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { UserOptionsComponent } from './Components/user/user-options/user-options.component';
import { UserPanelComponent } from './Components/user/user-panel/user-panel.component';
import { AdminGuard } from './Guards/admin.guard';
import { UserGuard } from './Guards/user.guard';

const routes: Routes = [
  {path:'',component:NoLoginComponent},
  {path:'user',component:UserOptionsComponent,children:[
    {path:'signUp',component:SignUpComponent},
    {path:'signIn',component:SignInComponent},
  //  {path:'userPanel',component:UserPanelComponent,canActivate:[UserGuard]},
    //{path:'raiseTicket',component:}
  ]},
  {path:'userPanel',component:UserPanelComponent,canActivate:[UserGuard]},
  {path:'admin',component:AdminPanelComponent,canActivate:[AdminGuard],children:[
    {path:'addEmployee',component:AddEmployeeComponent},
    {path:'deleteEmployee',component:DeleteEmployeeComponent},
    {path:'generateReport',component:ReportComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
