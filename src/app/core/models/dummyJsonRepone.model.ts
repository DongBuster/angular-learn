import { Product } from "./product.model.";

export interface DummyJsonRepone { 
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
