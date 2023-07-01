import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  showAddProduct = false;
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
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

  onConfirmDelete(product: Product) {
    this.apiService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
      this.productToDelete = null;
    });
  }

  onCancelDelete() {
    this.productToDelete = null;
  }
}
