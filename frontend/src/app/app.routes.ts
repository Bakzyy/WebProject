import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {OrderListComponent} from "./components/order-list/order-list.component";

export const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: MainComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'orders', component: OrderListComponent}
];
