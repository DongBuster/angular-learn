import { DetailRepository } from './../../core/repository/detail.repository';
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model.';
import { ToastComponent } from '../../component/toast/toast.component';
import { ToastService } from '../../core/service/toast/toast.service';

@Component({
  selector: 'app-detail-housing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent, FormsModule],
  templateUrl: './detail-housing.component.html',
  styleUrls: ['./detail-housing.component.css'],
})
export class DetailHousingComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  product: Product | undefined;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  quantity: number = 1;

  applyForm = new FormGroup({
    Title: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    // email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private detailRepo: DetailRepository,
    private toastService: ToastService
  ) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.detailRepo.getProductById(housingLocationId).subscribe((product) => {
      this.product = product;
    });
  }

  getEmailErrorMessage() {
    const emailControl = this.applyForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'You must enter a value';
    }
    return emailControl?.hasError('email') ? 'Not a valid email' : '';
  }

  submitApplication() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.detailRepo
      .updateProduct(housingLocationId, {
        price: 19.99,
        title: 'Updated Name',
      })
      .subscribe({
        next: () => this.toastService.Success('Updated thành công!'),

        error: (err) => this.toastService.Error('Updated không thành công!'),
      });
  }

  testDelete() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.detailRepo.deleteProduct(housingLocationId).subscribe({
      next: () => this.toastService.Success('Delete thành công!'),
      error: (err) => this.toastService.Error('Delete không thành công!'),
    });
  }

  testAdd() {
    this.detailRepo
      .addProduct({
        price: 19.99,
        title: 'Updated Name',
      })
      .subscribe({
        next: () => this.toastService.Success('Add thành công!'),
        error: (err) => this.toastService.Error('Add không thành công!'),
      });
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    // if (this.quantity < this.product?.stock) {
    this.quantity++;
    // }
  }
}
