import { ProductRepositoryHttp } from '../../data/product/ProductRepositoryHttp';
import { createHttpClient } from '../../data/product/util/httpClient';
import { FetchCategories } from '../../domain/product/FetchCategories';
import { FetchProducts } from '../../domain/product/FetchProducts';

const http = createHttpClient;
const repo = new ProductRepositoryHttp(http);

export const Services = {
  fetchProducts: new FetchProducts(repo),
  fetchCategories: new FetchCategories(repo),
};
