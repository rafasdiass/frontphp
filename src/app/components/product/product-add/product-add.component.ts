import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // add Output and EventEmitter
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service'; // Import ProductService
import { CategoryService } from '../../../services/category.service'; // Import CategoryService
import { Product } from '../../../models/product.model';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category_id: 0
  };

  products: Product[] = [];

  @Output() cancelAddEvent = new EventEmitter<void>(); // add this line

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { } // Inject new services

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe( // Use CategoryService here
      (categories: Product[]) => {
        this.products = categories;
        if (this.products.length > 0) {
          this.product.category_id = this.products[0]?.id || 0;
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addProduct() {
    this.productService.createProduct(this.product).subscribe( // Use ProductService here
      (newProduct) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  cancelAdd() {
    this.cancelAddEvent.emit(); // this line should work now
  }
}
