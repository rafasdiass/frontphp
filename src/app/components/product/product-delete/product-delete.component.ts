import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  productId!: number;
  isProductIdNull = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
      } else {
        this.isProductIdNull = true;
      }
    });
  }

  deleteProduct() {
    if (this.productId) {
      this.apiService.deleteProduct(this.productId).subscribe(() => {
        this.apiService.updateProductsList();
        this.router.navigate(['/products']);
      });
    } else {
      // Tratar caso o id seja nulo
    }
  }

  cancelDelete() {
    this.router.navigate(['/products']);
  }
}
