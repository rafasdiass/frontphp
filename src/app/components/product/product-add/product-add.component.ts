import { Component , EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model'; // import the Category model

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  @Output() productAdded = new EventEmitter<Product>();
  @Output() cancelAddEvent = new EventEmitter<void>();
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category_id: 0
  };

  categories: Category[] = []; // add a categories property

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getCategories(); // get the categories when the component is initialized
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addProduct() {
    this.apiService.addProduct(this.product).subscribe(
      (newProduct) => {
        // Use the new product returned from the server
        this.productAdded.emit(newProduct);
        // Redirect to the product listing page after adding the product
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  cancelAdd() {
    this.cancelAddEvent.emit();
  }
}
