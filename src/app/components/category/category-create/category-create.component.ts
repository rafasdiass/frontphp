import { Component, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  @Output() categoryAdded = new EventEmitter<Category>();
  category: Category = { name: '' };
  successMessage: string | null = null;

  constructor(private categoryService: CategoryService) { }

  createCategory() {
    this.categoryService.createCategory(this.category).subscribe(
      (category: Category) => {
        this.successMessage = 'Categoria criada com sucesso: ' + category.name;
        this.categoryAdded.emit(category); // Emit the categoryAdded event
        this.category = { name: '' }; // Reset the form
      },
      (error: any) => {
        console.log('Erro ao criar a categoria:', error);
        this.successMessage = null;
      }
    );
  }
}
