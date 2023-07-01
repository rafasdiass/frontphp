import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  productId: number | null = null;
  isProductIdNull = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.getProduct(this.productId);
      } else {
        this.isProductIdNull = true;
      }
    });
  }

  getProduct(id: number) {
    this.apiService.getProduct(id).subscribe(product => {
      if (product) {
        this.product = product;
      } else {
        // Tratar caso o produto seja nulo
      }
    });
  }
}
