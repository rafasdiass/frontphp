import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // add Output and EventEmitter
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category_id: 0
  };

  categories: Category[] = [];

  @Output() cancelAddEvent = new EventEmitter<void>(); // add this line

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        if (this.categories.length > 0) {
          this.product.category_id = this.categories[0]?.id || 0;
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addProduct() {
    this.apiService.addProduct(this.product).subscribe(
      (newProduct) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  cancelAdd() {
    this.cancelAddEvent.emit(); // this line should work now
  }
}
