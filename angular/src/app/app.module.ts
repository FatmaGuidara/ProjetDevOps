import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { AllusersComponent } from './pages/user/allusers/allusers.component';
import { SingleuserComponent } from './pages/user/singleuser/singleuser.component';
import { EdituserComponent } from './pages/user/edituser/edituser.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AllproductsComponent } from './pages/product/allproducts/allproducts.component';
import { SingleproductComponent } from './pages/product/singleproduct/singleproduct.component';
import { AddproductComponent } from './pages/product/addproduct/addproduct.component';
import { EditproductComponent } from './pages/product/editproduct/editproduct.component';
import { MyproductsComponent } from './pages/product/myproducts/myproducts.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { LogoutComponent } from './pages/user/logout/logout.component';
import { DeleteproductComponent } from './pages/product/deleteproduct/deleteproduct.component';
import { DeleteuserComponent } from './pages/user/deleteuser/deleteuser.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { AllcategoriesComponent } from './pages/category/allcategories/allcategories.component';
import { DelcategoryComponent } from './pages/category/delcategory/delcategory.component';
import { ProductsComponent } from './pages/category/products/products.component';
import { EditcategoryComponent } from './pages/category/editcategory/editcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AllusersComponent,
    SingleuserComponent,
    EdituserComponent,
    ProfileComponent,
    AllproductsComponent,
    SingleproductComponent,
    AddproductComponent,
    EditproductComponent,
    MyproductsComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LogoutComponent,
    DeleteproductComponent,
    DeleteuserComponent,
    AddcategoryComponent,
    AllcategoriesComponent,
    DelcategoryComponent,
    ProductsComponent,
    EditcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true //work with multiple users
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
