import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model'; // import the Category model

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() productDeleted = new EventEmitter<number>();
  products: Product[] = [];
  categories: Category[] = []; // New property to hold categories
  showAddProduct = false;
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories(); // Call getCategories on initialization
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.log('Erro ao obter os produtos:', error);
      }
    );
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.log('Erro ao obter as categorias:', error);
      }
    );
  }

  toggleAddProduct() {
    this.showAddProduct = !this.showAddProduct;
    this.selectedProduct = null;
    this.productToDelete = null;
  }

  onProductSelect(product: Product) {
    this.selectedProduct = product;
    this.showAddProduct = false;
    this.productToDelete = null;
  }

  onDeleteProduct(product: Product) {
    this.productToDelete = product;
    this.showAddProduct = false;
    this.selectedProduct = null;
  }

  onProductAdded(product: Product) {
    this.products.push(product);
    this.toggleAddProduct();
  }

  onConfirmDelete(productId: number) {
    this.apiService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
      this.productToDelete = null;
    });
  }

  onCancelDelete() {
    this.productToDelete = null;
  }
}
