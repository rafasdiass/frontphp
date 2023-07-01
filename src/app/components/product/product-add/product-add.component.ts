import { Component , EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  @Output() productAdded = new EventEmitter<Product>();
  @Output() cancelAddEvent = new EventEmitter<void>(); //renamed to cancelAddEvent
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category_id: 0
  };

  constructor(private apiService: ApiService, private router: Router) { }

  addProduct() {
    this.apiService.addProduct(this.product).subscribe(() => {
      // Emit the event so the parent component can react
      this.productAdded.emit(this.product);
      // Redirect to the product listing page after adding the product
      this.router.navigate(['/products']);
    });
  }

  // Emit an event when the user cancels the add operation
  cancelAdd() { //function name remains as cancelAdd
    this.cancelAddEvent.emit(); //using cancelAddEvent here
  }
}
