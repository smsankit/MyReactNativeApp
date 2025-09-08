// src/presentation/hooks/useProducts.ts
import { useEffect, useState, useCallback } from 'react';
import { Services } from '../../common/product/serviceLocator';
import { Product } from '../../domain/product/Product';
import { CatagoryDto } from '../../data/product/CatagoryDto';

// Setup repo & usecases (could also be via serviceLocator)
const fetchProducts = Services.fetchProducts;
const fetchCategories = Services.fetchCategories;

export function useProductsHook() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CatagoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CatagoryDto | null>(
    null,
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const pageSize = 20;

  const loadProducts = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const currentPage = reset ? 0 : page;
        const data = await fetchProducts.execute({
          search,
          category: selectedCategory?.slug ?? undefined,
          skip: currentPage * pageSize,
          limit: pageSize,
        });

        setProducts(prev =>
          reset ? data.products : [...prev, ...data.products],
        );
        setHasMore(data.total > (currentPage + 1) * pageSize);
        setPage(reset ? 1 : currentPage + 1);
      } finally {
        setLoading(false);
      }
    },
    [search, selectedCategory, page],
  );

  // Load categories once
  useEffect(() => {
    fetchCategories.execute().then(setCategories).catch(console.error);
  }, []);

  // Reload on search/category change
  useEffect(() => {
    setPage(0);
    console.log('Page reset and API called');
    loadProducts(true);
  }, [search, selectedCategory]);

  return {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    loadProducts,
    hasMore,
    loading,
    page,
  };
}
