import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
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
      // Atualizar a lista de produtos
      this.apiService.updateProductsList();
      // Redirecionar para a página de listagem de produtos após adicionar o produto
      this.router.navigate(['/products']);
    });
  }
}
