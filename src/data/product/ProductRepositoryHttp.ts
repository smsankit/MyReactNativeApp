import { ProductRepository } from '../../domain/product/ProductRepository';
import { ProductListResponse } from '../../domain/product/Product';
import { httpGet } from './util/httpClient';
import { CatagoryDto } from './CatagoryDto';

export class ProductRepositoryHttp implements ProductRepository {
  async fetchProducts({
    search,
    category,
    skip,
    limit,
    signal,
  }: {
    search?: string;
    category?: string;
    skip: number;
    limit: number;
    signal?: AbortSignal;
  }): Promise<ProductListResponse> {
    let path = '';

    if (search) {
      path = `/products/search?q=${encodeURIComponent(
        search,
      )}&skip=${skip}&limit=${limit}`;
    } else if (category) {
      path = `/products/category/${encodeURIComponent(
        category,
      )}?skip=${skip}&limit=${limit}`;
    } else {
      path = `/products?skip=${skip}&limit=${limit}`;
    }

    return httpGet<ProductListResponse>(path, { signal });
  }

  async fetchCategories(signal?: AbortSignal): Promise<CatagoryDto[]> {
    return httpGet<CatagoryDto[]>('/products/categories', { signal });
  }
}
