import { environment } from '../environments/environment.prod';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { LoginComponent } from './login/login.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CategoryCardComponent } from './home/category-card/category-card.component';
import { FooterComponent } from './home/footer/footer.component';
import { TestimonialsComponent } from './home/testimonials/testimonials.component';
import { CategoriesDisplayComponent } from './home/categories-display/categories-display.component';
import { ImageGalleryComponent } from './gallery/gallery.component';

import { AuthService } from './_services/auth.service';
import { AuthguardService } from './_services/authguard.service';
import { UserService } from './_services/user.service';
import { AdminAuthGuardService } from './_services/admin-auth-guard.service';
import { CategoryService } from './_services/category.service';
import { ProductService } from './_services/product.service';
import { ShoppingCartService } from './_services/shopping-cart.service';
import { CountryService } from './_services/country.service';
import { OrderService } from './_services/order.service';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CategoryCardComponent,
    CategoriesDisplayComponent,
    FooterComponent,
    TestimonialsComponent,
    AboutUsComponent,
    ImageGalleryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    FontAwesomeModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    MatDatepickerModule,
    MatNativeDateModule,

    NgbModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: { animation: 'isStart' } },
      { path: 'products', component: ProductsComponent, data: { animation: 'isLeft' } },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'gallery', component: ImageGalleryComponent, data: { animation: 'isRight' } },

      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent, data: { animation: 'isEnd' } },

      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthguardService], data: { animation: 'isLeft' } },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthguardService] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthguardService] },

      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthguardService, AdminAuthGuardService] },
    ]),
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthguardService, AdminAuthGuardService, UserService, CategoryService, ProductService, ShoppingCartService, CountryService, OrderService, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
