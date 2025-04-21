import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import { Product } from "../models/product.model.";

@Injectable({providedIn:'root'})
export class DetailRepository{
    constructor(private http:HttpClient){}
    getProductById(id:number):Observable<Product>{
        return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
    }
    updateProduct(id:number,data:Partial<Product>):Observable<Product>{
        return this.http.put<Product>(`https://dummyjson.com/products/${id}`,data);
    }
    deleteProduct(id:Number):Observable<void>{
        return this.http.delete<void>(`https://dummyjson.com/products/${id}`);
    }
    addProduct(data:Partial<Product>):Observable<Product>{
        return  this.http.post<Product>(`https://dummyjson.com/products/add`,data);
    }
}