import { AdminComponent } from "./admin.component";
import { Routes } from "@angular/router";
import { OrderAdminComponent } from "./order/order-admin.component";
import { ProductAdminComponent } from "./product/product-admin.component";
import { CategoryAdminComponent } from "./category/category-admin.component";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'orders',
                component: OrderAdminComponent
            },            
            {
                path: 'products',
                component: ProductAdminComponent
            },
            {
                path: 'categories',
                component: CategoryAdminComponent
            },
           
        ]
    }
];
/*
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
*/
