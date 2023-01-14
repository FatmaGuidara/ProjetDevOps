import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { AllcategoriesComponent } from './pages/category/allcategories/allcategories.component';
import { DelcategoryComponent } from './pages/category/delcategory/delcategory.component';
import { EditcategoryComponent } from './pages/category/editcategory/editcategory.component';
import { ProductsComponent } from './pages/category/products/products.component';
import { AddproductComponent } from './pages/product/addproduct/addproduct.component';
import { AllproductsComponent } from './pages/product/allproducts/allproducts.component';
import { DeleteproductComponent } from './pages/product/deleteproduct/deleteproduct.component';
import { EditproductComponent } from './pages/product/editproduct/editproduct.component';
import { MyproductsComponent } from './pages/product/myproducts/myproducts.component';
import { SingleproductComponent } from './pages/product/singleproduct/singleproduct.component';
import { AllusersComponent } from './pages/user/allusers/allusers.component';
import { DeleteuserComponent } from './pages/user/deleteuser/deleteuser.component';
import { EdituserComponent } from './pages/user/edituser/edituser.component';
import { LoginComponent } from './pages/user/login/login.component';
import { LogoutComponent } from './pages/user/logout/logout.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { SingleuserComponent } from './pages/user/singleuser/singleuser.component';
import { IsloginGuard } from './providers/guards/islogin.guard';

const routes: Routes = [
  {path: "", component:HomeComponent},
  // {path:"login", redirectTo:""},
  {path: "user", children:[
    {path:"", component:AllusersComponent},
    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"profile", component:ProfileComponent, canActivate: [IsloginGuard]},
    {path:"logout", component: LogoutComponent},
    {path:"single", children:[
      {path:"view/:id", component:SingleuserComponent},
      {path:"edit/:id", component:EdituserComponent, canActivate: [IsloginGuard]},
      {path:"delete/:id", component:DeleteuserComponent, canActivate: [IsloginGuard]},
    ]}
  ]},
  {path: "product", children:[
    {path:"", component:AllproductsComponent},
    {path:"add", component:AddproductComponent, canActivate: [IsloginGuard]},
    {path:"myproducts", component:MyproductsComponent, canActivate: [IsloginGuard]},
    {path:"single", children:[
      {path:"view/:id", component:SingleproductComponent},
      {path:"edit/:id", component:EditproductComponent, canActivate: [IsloginGuard]},
      {path:"delete/:id", component:DeleteproductComponent, canActivate: [IsloginGuard]},
    ]}
  ]},
  {path: "category", children:[
    {path:"", component:AllcategoriesComponent},
    {path:"products/:id", component:ProductsComponent},
    {path:"add", component:AddcategoryComponent, canActivate: [IsloginGuard]},
    {path:"single", children:[
      {path:"edit/:id", component:EditcategoryComponent, canActivate: [IsloginGuard]},
      {path:"delete/:id", component:DelcategoryComponent, canActivate: [IsloginGuard]},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
