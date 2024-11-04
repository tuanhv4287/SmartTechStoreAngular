import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, OrderComponent, OrderDetailComponent,
    LoginComponent, RegisterComponent, DetailProductComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopapp-angular';
}
