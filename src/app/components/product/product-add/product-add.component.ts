import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model'; // Import Category model if you have

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
  categories: Category[] = []; // add this line to store categories
  successMessage: string | null = '';

  @Output() productAdded = new EventEmitter<Product>();
  @Output() cancelAddEvent = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,  // inject CategoryService
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories(); // fetch categories on init
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        if (this.products.length > 0) {
          this.product.category_id = this.products[0]?.id || 0;
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // add getCategories method

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (response) => {


        this.categories = response.categories;
      },
      (error) => {
        console.log('Erro ao obter as categorias:', error);
      }
    );
  }

  addProduct() {
    this.productService.createProduct(this.product).subscribe(
      (product: Product) => {
        this.successMessage = 'produto criado com sucesso: ' + product.name;
        this.productAdded.emit(product);
        this.product = { id: 0, name: '', price: 0, category_id: 0 };
      },
      (error: any) => {
        console.log('Erro ao criar o produto:', error);
        this.successMessage = null;
      }
    );
  }

  cancelAdd() {
    this.cancelAddEvent.emit();
  }
}
