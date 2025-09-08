import { ProductRepository } from './ProductRepository';

export class FetchCategories {
  constructor(private repo: ProductRepository) {}

  execute(signal?: AbortSignal) {
    return this.repo.fetchCategories(signal);
  }
}
