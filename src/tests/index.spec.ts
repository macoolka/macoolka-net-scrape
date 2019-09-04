import { scrape } from '../'
import * as MN from 'macoolka-app/lib/MonadNode'
import assert from 'assert'
import { pipe } from 'fp-ts/lib/pipeable';
import * as E from 'fp-ts/lib/Either';
describe('scrape', () => {
    it('ok', async () => {
        const result = await pipe(
            scrape<{ articles: any[] }>({
                url: 'https://ionicabizau.net',
                articles: {
                    listItem: ".article"
                    , data: {

                        // Get the article date and convert it into a Date object
                        createdAt: {
                            selector: ".date"
                            , convert: x => new Date(x)
                        }

                        // Get the title
                        , title: "a.article-title"

                        // Nested list
                        , tags: {
                            listItem: ".tags > span"
                        }

                        // Get the content
                        , content: {
                            selector: ".article-content"
                            , how: "html"
                        }

                        // Get attribute value of root listItem by omitting the selector
                        , classes: {
                            attr: "class"
                        }
                    }
                },
                title: '.mnva'
            }),

            MN.map(a => {
                assert(a.data.articles.length > 0)
                return a
            })

        )()
        assert(E.isRight(result))

    }, 5000)

})
