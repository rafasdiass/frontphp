import { Category } from './../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  showAddCategory = true;
  selectedCategory: Category | null = null;
  categoryToDelete: Category | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
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

  toggleAddCategory() {
    this.showAddCategory = !this.showAddCategory;
    this.selectedCategory = null;
    this.categoryToDelete = null;
  }

  onCategorySelect(category: Category) {
    this.selectedCategory = category;
    this.showAddCategory = false;
    this.categoryToDelete = null;
  }

  onDeleteCategory(category: Category) {
    this.categoryToDelete = category;
    this.showAddCategory = false;
    this.selectedCategory = null;
  }

  onCategoryAdded(category: Category) {
    this.categories.push(category);
    this.toggleAddCategory();
  }

  onConfirmDelete(category: Category) {
    if (category.id !== undefined) {
      this.categoryService.deleteCategory(category.id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== category.id);
        this.categoryToDelete = null;
      });
    } else {
      console.error('Error: category.id is undefined');
    }
  }

  onCancelDelete() {
    this.categoryToDelete = null;
  }
}
