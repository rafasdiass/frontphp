import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
  };

  products: Product[] = [];
  categories: Category[] = [];
  successMessage: string | null = '';

  @Output() productAdded = new EventEmitter<Product>();
  @Output() cancelAddEvent = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
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
    if (!this.product.name || !this.product.price) {
      this.successMessage = 'Preencha todos os campos do produto';
      return;
    }

    console.log('Chamando createProduct com:', this.product);

    this.productService.createProduct(this.product).pipe(
      retry(3)  // tente a operação novamente até 3 vezes antes de falhar
    ).subscribe(
      (createdProduct: Product) => {
        this.successMessage = `Produto criado com sucesso: ${createdProduct.name}`;
        this.productAdded.emit(createdProduct);
        this.resetProductForm();
      },
      (error: any) => {
        console.error('Erro ao criar o produto:', error);
        this.successMessage = 'Erro ao criar o produto. Por favor, tente novamente.';
      }
    );
  }

  resetProductForm() {
    // Redefine o formulário do produto após o sucesso da criação
    this.product = { name: '', price: 0 };
  }

  cancelAdd() {
    this.cancelAddEvent.emit();
  }
}
