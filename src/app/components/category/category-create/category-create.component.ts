import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  category: Category = { name: '' };
  successMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  createCategory() {
    this.apiService.createCategory(this.category).subscribe(
      (category: Category) => {
        this.successMessage = 'Categoria criada com sucesso: ' + category.name;
        this.category = { name: '' }; // Reset the form
      },
      (error: any) => {
        console.log('Erro ao criar a categoria:', error);
        this.successMessage = null;
      }
    );
  }
}
