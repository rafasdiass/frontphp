import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() category!: Category;
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (products) => { // A resposta já é uma matriz de produtos
        // Filtrar os produtos para a categoria atual
        this.products = products.filter((product: Product) => product.category_id === this.category.id);
      },
      (error) => {
        console.log('Erro ao obter os produtos:', error);
      }
    );
  }
}
