import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (categories: Category[] | null) => {
        if (categories) {
          this.categories = categories;
        } else {
          console.error('getCategories retornou null');
        }
      },
      (error: any) => {
        console.log('Erro ao obter as categorias:', error);
      }
    );
  }

  deleteCategory(id: number | undefined) {
    if (id) {
      this.apiService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter(category => category.id !== id);
        },
        (error: any) => {
          console.log('Erro ao remover a categoria:', error);
        }
      );
    } else {
      console.error('ID da categoria não fornecido');
    }
  }
}
