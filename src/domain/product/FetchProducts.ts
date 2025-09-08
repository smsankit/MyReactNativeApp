import { ProductRepository } from './ProductRepository';

export class FetchProducts {
  constructor(private repo: ProductRepository) {}

  execute(params: Parameters<ProductRepository['fetchProducts']>[0]) {
    return this.repo.fetchProducts(params);
  }
}
