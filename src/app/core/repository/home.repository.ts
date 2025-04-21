import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model.';
import { DummyJsonRepone } from '../models/dummyJsonRepone.model';

@Injectable({ providedIn: 'root' })
export class HomeRepository {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Product[]> {
    return this.http
      .get<DummyJsonRepone>('https://dummyjson.com/products')
      .pipe(map((response) => response.products));
  }
}
