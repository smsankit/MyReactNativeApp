export interface Article {
  article_id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image_url: string;
}

export interface NewsResponse {
  status: 'success' | 'error';
  totalResults: number;
  articles: Article[];
}
