import { environment } from '../environments/environment.prod';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, ProductsComponent, ShoppingCartComponent, CheckoutComponent, OrderSuccessComponent, MyOrdersComponent, LoginComponent, AdminProductsComponent, AdminOrdersComponent, ProductFormComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthguardService] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthguardService] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthguardService] },

      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
    ]),
  ],
  providers: [AuthService, AuthguardService, AdminAuthGuardService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
