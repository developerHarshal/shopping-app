import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingBagComponent } from './components/shopping-bag/shopping-bag.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    AddProductComponent,
    ShoppingBagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
