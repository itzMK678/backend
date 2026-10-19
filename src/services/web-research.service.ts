import { WebSearchResult } from "../types/ai.types";

/**
 * Real educational web search integration.
 * Queries DuckDuckGo HTML and Wikipedia OpenSearch for verified academic references,
 * returning actual titles and live, clickable URLs.
 * Handles failures and offline environments gracefully without fabricating URLs.
 */
export async function searchEducationalWeb(query: string, maxResults = 4): Promise<WebSearchResult[]> {
  const results: WebSearchResult[] = [];
  const cleanQuery = encodeURIComponent(query.trim().slice(0, 100));

  // 1. DuckDuckGo HTML search for real websites, titles, and URLs
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const ddgRes = await fetch(`https://html.duckduckgo.com/html/?q=${cleanQuery}+syllabus+curriculum`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (ddgRes.ok) {
      const html = await ddgRes.text();
      const re =
        /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?(?:<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>)?/g;
      let match;
      while ((match = re.exec(html)) !== null && results.length < maxResults) {
        const rawUrl = match[1];
        const uddgMatch = rawUrl.match(/uddg=([^&]+)/);
        const url = uddgMatch ? decodeURIComponent(uddgMatch[1]) : rawUrl;
        const title = match[2]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .trim();
        const snippet = (match[3] || '')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .trim();
        if (title && url && url.startsWith('http') && !results.some((r) => r.url === url)) {
          results.push({ title, url, snippet, source: 'Web' });
        }
      }
    }
  } catch (err: any) {
    console.warn('DuckDuckGo search warning:', err?.message || err);
  }

  // 2. Wikipedia OpenSearch fallback/enrichment for verified academic encyclopedia sources
  if (results.length < 2) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const wikiRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${cleanQuery}&limit=3&namespace=0&format=json`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);
      if (wikiRes.ok) {
        const data: any = await wikiRes.json();
        const titles: string[] = data[1] || [];
        const snippets: string[] = data[2] || [];
        const urls: string[] = data[3] || [];
        for (let i = 0; i < titles.length && results.length < maxResults; i++) {
          if (titles[i] && urls[i] && !results.some((r) => r.url === urls[i])) {
            results.push({
              title: titles[i],
              url: urls[i],
              snippet: snippets[i] || 'Wikipedia Academic Reference',
              source: 'Wikipedia Academic',
            });
          }
        }
      }
    } catch (wikiErr: any) {
      console.warn('Wikipedia OpenSearch warning:', wikiErr?.message || wikiErr);
    }
  }

  return results;
}