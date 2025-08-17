import {
  NEWS_API_KEY,
  BASE_URL,
  isNotNullOrEmpty,
} from '../../common/utils/config';

export async function fetchNews(page: string = '', signal?: AbortSignal) {
  let url = `${BASE_URL}?apiKey=${NEWS_API_KEY}&language=en`;
  if (isNotNullOrEmpty(page)) {
    url += `&page=${page}`;
  }

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error('Failed to fetch news');

    const json = await response.json();

    console.log('Fetched news:', json.results);

    return {
      articles: json.results || [],
      hasMoreNews: !!json.nextPage,
      nextPage: json.nextPage,
    };
  } catch (error) {
    throw error;
  }
}
