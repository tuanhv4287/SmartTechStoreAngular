import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { NgClass, NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor, NgClass],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
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
          this.showImage(0);
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
  showImage(index: number): void {
    if (
      this.product &&
      this.product.product_images &&
      this.product.product_images.length > 0
    ) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }
      this.currentImageIndex = index;
    }
  }
  thumbnailClick(index: number) {
    this.currentImageIndex = index;
  }
  nextImage(): void {
    this.showImage(this.currentImageIndex + 1);
  }
  previousImage(): void {
    this.showImage(this.currentImageIndex - 1);
  }
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/orders']);
  }
}
