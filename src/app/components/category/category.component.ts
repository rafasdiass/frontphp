import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category | null = null;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getCategory(+id);
        this.getProductsByCategory(+id); // updated to getProductsByCategory()
      }
    });
  }

  getCategory(id: number) {
    this.apiService.getCategories().subscribe( // updated to getCategories()
      (categories: Category[]) => {
        this.category = categories.find(category => category.id === id) || null;
      },
      (error: any) => { // added type any for error
        console.log('Erro ao obter a categoria:', error);
      }
    );
  }

  getProductsByCategory(category_id: number) { // updated to getProductsByCategory
    this.apiService.getProductsByCategory(category_id).subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => { // added type any for error
        console.log('Erro ao obter os produtos:', error);
      }
    );
  }
}
