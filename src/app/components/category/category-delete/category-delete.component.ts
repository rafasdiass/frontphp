// category-delete.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent {
  @Input() category: Category | null = null;
  @Output() confirmDelete = new EventEmitter<Category>();
  @Output() cancelDelete = new EventEmitter();

  onConfirmDelete() {
    if (this.category) {
      this.confirmDelete.emit(this.category);
    }
  }

  onCancelDelete() {
    this.cancelDelete.emit();
  }
}
