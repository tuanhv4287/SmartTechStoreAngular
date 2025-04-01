import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-admin',
  standalone: true,
  imports: [NgFor, NgClass, TranslateModule, FormsModule],
  templateUrl: './edit-product-admin.component.html',
  styleUrl: './edit-product-admin.component.scss',
})
export class EditProductAdminComponent {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  productDetail: any = {
    name: '',
    describe: '',
    price: 0,
    Image: [],
  };
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!; // Sử dụng 'id' để lấy tham số từ URL, '+' để chuyển đổi sang kiểu số
    });
    const idParam = this.productId;
    if (idParam !== null) {
      this.productId = +idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: any) => {
              if (
                !product_image.image_url.startsWith(
                  `${environment.apiBaseUrl}/products/images/`
                )
              ) {
                product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
              }
            });
          }
          this.product = response;
          this.productDetail = {
            name: this.product?.name,
            describe: this.product?.description,
            price: this.product?.price,
          };
        },
        complete: () => {},
        error: (error: any) => {
          console.error('Error fetching detail:', error);
        },
      });
    } else {
      console.error('Invalid productId', idParam);
    }
  }
  cancel() {
    this.router.navigate(['/admin/products']);
  }
}
