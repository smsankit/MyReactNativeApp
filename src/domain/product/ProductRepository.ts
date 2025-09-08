import { CatagoryDto } from '../../data/product/CatagoryDto';
import { ProductListResponse } from './Product';

export type Paginated<T> = {
  items: T[];
  total: number;
  skip: number;
  limit: number;
};

export interface ProductRepository {
  fetchProducts(params: {
    search?: string;
    category?: string;
    skip: number;
    limit: number;
    signal?: AbortSignal;
  }): Promise<ProductListResponse>;

  fetchCategories(signal?: AbortSignal): Promise<CatagoryDto[]>;
}
