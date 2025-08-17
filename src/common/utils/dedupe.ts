import { Article } from '../../screens/news/types/article.type';

export function dedupeArticles(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter(article => {
    const key = article.link || article.article_id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
