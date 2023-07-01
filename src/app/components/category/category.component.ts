import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryId: number | null = null;
  isCategoryIdNull = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.getProductsByCategory(this.categoryId);
      } else {
        this.isCategoryIdNull = true;
      }
    });
  }

  getProductsByCategory(categoryId: number) {
    this.apiService.getProducts(categoryId).subscribe(products => {
      this.products = products;
    });
  }
}
