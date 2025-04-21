import { DetailRepository } from './../../core/repository/detail.repository';
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model.';
import { ToastComponent } from '../../component/toast/toast.component';
import { ToastService } from '../../core/service/toast/toast.service';

@Component({
  selector: 'app-detail-housing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './detail-housing.component.html',
  styleUrls: ['./detail-housing.component.css'],
})
export class DetailHousingComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  product: Product | undefined;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

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
  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
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
        next: () => this.toastService.show('Updated thành công!', 'success'),

        error: (err) =>
          this.toastService.show('Updated không thành công!', 'danger'),
      });
  }

  testDelete() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.detailRepo.deleteProduct(housingLocationId).subscribe({
      next: () => this.toastService.show('Delete thành công!', 'success'),

      error: (err) =>
        this.toastService.show('Delete không thành công!', 'danger'),
    });
  }

  testAdd() {
    this.detailRepo
      .addProduct({
        price: 19.99,
        title: 'Updated Name',
      })
      .subscribe({
        next: () => this.toastService.show('Add thành công!', 'success'),

        error: (err) =>
          this.toastService.show('Add không thành công!', 'danger'),
      });
  }
}
