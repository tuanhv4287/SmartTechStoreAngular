import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AuthGuardFn } from './components/guards/auth.guard';
import { AdminGuardFn } from './components/guards/admin.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order/order-admin.component';
import { ProductAdminComponent } from './components/admin/product/product-admin.component';
import { CategoryAdminComponent } from './components/admin/category/category-admin.component';
import { DetailOrderAdminComponent } from './components/admin/detail-order-admin/detail-order-admin.component';
import { CatalogSearchComponent } from './components/catalogsearch/catalogsearch.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path:'',component: HomeComponent },
    {path:'catalogsearch',component: CatalogSearchComponent },
    {path:'home',component: HomeComponent },
    {path:'about',component: AboutComponent },
    {path:'contact',component: ContactComponent },
    {path:'login',component: LoginComponent },
    {path:'register',component: RegisterComponent },
    {path:'products/:id',component: DetailProductComponent },
    {path:'orders',component: OrderComponent, canActivate:[AuthGuardFn] },
    {path:'user-profile',component: UserProfileComponent, canActivate:[AuthGuardFn] },
    {path:'orders/:id',component: OrderDetailComponent},
    {path:'admin',component: AdminComponent,canActivate:[AdminGuardFn]},
];

    
