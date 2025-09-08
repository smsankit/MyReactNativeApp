import { Product } from '../../domain/product/Product';
import { ProductDto } from './ProductDto';

export const mapProduct = (dto: ProductDto): Product => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  price: dto.price,
  discountPercentage: dto.discountPercentage,
  rating: dto.rating,
  stock: dto.stock,
  brand: dto.brand,
  category: dto.category,
  thumbnail: dto.thumbnail,
});
