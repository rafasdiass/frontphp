import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().pipe(
      tap((products: Product[]) => {
        this.products = products;
      }),
      catchError((error) => {
        console.log('Erro ao obter os produtos:', error);
        return throwError(error);
      })
    ).subscribe();
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
    this.products = [...this.products, product];
    this.toggleAddProduct();
  }

  onConfirmDelete(product: Product) {
    this.productService.deleteProduct(product.id).pipe(
      catchError((error) => {
        console.log('Erro ao excluir o produto:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
      this.productToDelete = null;
    });
  }

  onCancelDelete() {
    this.productToDelete = null;
  }
}
