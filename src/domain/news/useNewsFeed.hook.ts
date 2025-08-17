// hooks/useNewsFeed.ts
import { useCallback, useEffect, useState } from 'react';
import { Article } from '../../screens/news/types/article.type';
import { CACHE_TTL_MS, isNullOrEmpty } from '../../common/utils/config';
import { fetchNews } from '../../data/news/newsApiService';
import { dedupeArticles } from '../../common/utils/dedupe';
import * as NewsCacheService from '../../data/news/newsCacheService';
import { NEWS_CACHE_KEY } from '../../common/utils/constants';

export function useNewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const loadNews = useCallback(
    async (
      pageNum: string = '',
      isRefreshing = false,
      signal?: AbortSignal,
    ) => {
      try {
        if (isNullOrEmpty(pageNum)) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const {
          articles: newArticles,
          hasMoreNews,
          nextPage,
        } = await fetchNews(pageNum, signal);

        if (signal?.aborted) return;

        setArticles(prev => {
          let merged =
            isRefreshing && isNullOrEmpty(pageNum)
              ? newArticles
              : [...prev, ...newArticles];
          const deduped = dedupeArticles(merged);

          NewsCacheService.setCache(NEWS_CACHE_KEY, deduped);
          return deduped;
        });

        setPage(nextPage || '');

        setHasMore(hasMoreNews);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err.message || 'Failed to load news');
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
          setLoadingMore(false);
          setRefreshing(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const cached = await NewsCacheService.getCache<Article[]>(
          NEWS_CACHE_KEY,
          CACHE_TTL_MS,
        );
        if (cached) {
          setArticles(cached);
        }
        await loadNews('', false, controller.signal);
      } catch (err: any) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [loadNews]);

  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      const controller = new AbortController();
      loadNews(page, false, controller.signal);
      return () => controller.abort();
    }
  }, [hasMore, loadingMore, loadNews, page]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setPage('');
    const controller = new AbortController();
    loadNews('', true, controller.signal);
    NewsCacheService.clearCache(NEWS_CACHE_KEY);
    return () => controller.abort();
  }, [loadNews]);

  return {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    loadMore,
    refresh,
    hasMore,
  };
}
