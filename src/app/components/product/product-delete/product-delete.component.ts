import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Output() confirmDelete = new EventEmitter<number>();
  @Output() cancelDelete = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onConfirm() {
    this.confirmDelete.emit(this.product.id);
  }

  onCancel() {
    this.cancelDelete.emit();
  }
}
