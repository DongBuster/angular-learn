import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model.';
import { DummyJsonRepone } from '../models/dummyJsonRepone.model';

@Injectable({ providedIn: 'root' })
export class HomeRepository {
  constructor(private http: HttpClient) {}
  getAll(skip: Number): Observable<Product[]> {
    return this.http
      .get<DummyJsonRepone>(
        `https://dummyjson.com/products?limit=20&skip=${skip}`
      )
      .pipe(map((response) => response.products));
  }
  getAllAsc(skip: Number): Observable<Product[]> {
    return this.http
      .get<DummyJsonRepone>(
        `https://dummyjson.com/products?limit=20&skip=${skip}&sortBy=price&order=asc`
      )
      .pipe(map((response) => response.products));
  }
  getAllDesc(skip: Number): Observable<Product[]> {
    return this.http
      .get<DummyJsonRepone>(
        `https://dummyjson.com/products?limit=20&skip=${skip}&sortBy=price&order=desc`
      )
      .pipe(map((response) => response.products));
  }
  getProductWithSearch(quey: string): Observable<Product[]> {
    return this.http
      .get<DummyJsonRepone>(`https://dummyjson.com/products/search?q=${quey}`)
      .pipe(map((response) => response.products));
  }
}
