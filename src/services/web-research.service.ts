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

  // Run DuckDuckGo and Wikipedia concurrently with strict short timeouts
  const searchDuckDuckGo = async (): Promise<WebSearchResult[]> => {
    const ddgResults: WebSearchResult[] = [];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
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
        while ((match = re.exec(html)) !== null && ddgResults.length < maxResults) {
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
          if (title && url && url.startsWith('http') && !ddgResults.some((r) => r.url === url)) {
            ddgResults.push({ title, url, snippet, source: 'Web' });
          }
        }
      }
    } catch (err: any) {
      console.warn('DuckDuckGo search warning:', err?.message || err);
    }
    return ddgResults;
  };

  const searchWikipedia = async (): Promise<WebSearchResult[]> => {
    const wikiResults: WebSearchResult[] = [];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
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
        for (let i = 0; i < titles.length && wikiResults.length < maxResults; i++) {
          if (titles[i] && urls[i] && !wikiResults.some((r) => r.url === urls[i])) {
            wikiResults.push({
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
    return wikiResults;
  };

  const [ddgOutcome, wikiOutcome] = await Promise.allSettled([
    searchDuckDuckGo(),
    searchWikipedia(),
  ]);

  const ddgItems = ddgOutcome.status === 'fulfilled' ? ddgOutcome.value : [];
  const wikiItems = wikiOutcome.status === 'fulfilled' ? wikiOutcome.value : [];

  for (const item of [...ddgItems, ...wikiItems]) {
    if (results.length >= maxResults) break;
    if (!results.some((r) => r.url === item.url)) {
      results.push(item);
    }
  }

  return results;
}