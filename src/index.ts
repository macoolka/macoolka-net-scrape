/**
 * @file
 */
import { Task } from 'fp-ts/lib/Task';
import _scrape, { ScrapeOptions } from 'scrape-it';
import { MonadNode, fromTask } from 'macoolka-app/lib/MonadNode';
import { merge, omit } from 'macoolka-object';
export interface ScrapeInput extends ScrapeOptions {
    url: string;
}
const scrapeTask = <T = any>(input: ScrapeInput): Task<{ data: T }> => async () => {
    input = merge({}, {
        /* Here you should specify the exact link to the file you are trying to download */
        url: input.url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        },
        /* GZIP true for most of the websites now, disable it if you don't need it */
        gzip: true,
    }, input);
    return await _scrape(input, omit(input, ['url', 'headers', 'gzip']));
};
/**
 * Scraper
 *
 * @example
 * import { scrape } from '../'
 * import * as MN from 'macoolka-app/lib/MonadNode'
 * import assert from 'assert'
 * import { pipe } from 'fp-ts/lib/pipeable';
 * import * as E from 'fp-ts/lib/Either';
 * const result = await pipe(
 *    scrape<{ articles: any[] }>({
 *        url: 'https://ionicabizau.net',
 *        articles: {
 *           listItem: ".article"
 *            , data: {
 *
 *                // Get the article date and convert it into a Date object
 *                createdAt: {
 *                    selector: ".date"
 *                    , convert: x => new Date(x)
 *                }
 *
 *                // Get the title
 *                , title: "a.article-title"
 *
 *                // Nested list
 *                , tags: {
 *                    listItem: ".tags > span"
 *                }
 *
 *                // Get the content
 *                , content: {
 *                    selector: ".article-content"
 *                    , how: "html"
 *                }
 *
 *                // Get attribute value of root listItem by omitting the selector
 *                , classes: {
 *                    attr: "class"
 *                }
 *            }
 *        },
 *        title: '.mnva'
 *    }),
 *
 *    MN.map(a => {
 *        assert(a.data.articles.length > 0)
 *        return a
 *    })
 *
 * )()
 * assert(E.isRight(result))
 *
 * @since 0.2.0
 */
export const scrape = <T>(input: ScrapeInput): MonadNode<{ data: T }> => {
    return fromTask(scrapeTask(input));
};
