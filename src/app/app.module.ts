import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductComponent } from './components/product/product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './services/authguard.service';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryDeleteComponent } from './components/category/category-delete/category-delete.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
     ProductAddComponent,
    ProductDeleteComponent,
    ProductComponent,
    LoginComponent,
    CategoryComponent,

    CategoryCreateComponent,
     CategoryDeleteComponent,
     CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
