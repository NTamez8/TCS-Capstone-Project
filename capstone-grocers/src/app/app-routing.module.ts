//==MODULES==\\
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//==COMPONENTS==\\
//ADMIN
import { AddProductsComponent } from 'src/app/Components/admin/add-products/add-products.component';
import { AdminPanelComponent } from 'src/app/Components/admin/admin-panel/admin-panel.component';
import { DeleteProductsComponent } from 'src/app/Components/admin/delete-products/delete-products.component';
import { SignInComponent as AdminSignInComponent} from 'src/app/Components/admin/sign-in/sign-in.component';
import { UpdateProductsComponent } from 'src/app/Components/admin/update-products/update-products.component';
import { ViewRequestsComponent } from 'src/app/Components/admin/view-requests/view-requests.component';

const routes: Routes = [
  //must use path:"\x/y" for the pages to properly load
  //ADMIN
  {path:"\admin/signIn",component:AdminSignInComponent},
  {path:"\admin/addProducts",component:AddProductsComponent},
  {path:"\admin/updateProducts",component:UpdateProductsComponent},
  {path:"\admin/deleteProducts",component:DeleteProductsComponent},
  {path:"\admin/viewRequests",component:ViewRequestsComponent},
  {path:"\admin/panel",component:AdminPanelComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
