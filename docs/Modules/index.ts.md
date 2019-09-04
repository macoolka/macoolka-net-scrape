---
title: index.ts
nav_order: 1
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [ScrapeInput (interface)](#scrapeinput-interface)
- [scrape (function)](#scrape-function)

---

# ScrapeInput (interface)

**Signature**

```ts
interface ScrapeInput extends ScrapeOptions {
  url: string
}
```

# scrape (function)

Scraper

**Signature**

```ts

export const scrape = <T>(input: ScrapeInput): MonadNode<{ data: T }> => ...

```

**Example**

```ts
import { scrape } from '../'
import * as MN from 'macoolka-app/lib/MonadNode'
import assert from 'assert'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
const result = await pipe(
  scrape<{ articles: any[] }>({
    url: 'https://ionicabizau.net',
    articles: {
      listItem: '.article',
      data: {
        // Get the article date and convert it into a Date object
        createdAt: {
          selector: '.date',
          convert: x => new Date(x)
        },

        // Get the title
        title: 'a.article-title',

        // Nested list
        tags: {
          listItem: '.tags > span'
        },

        // Get the content
        content: {
          selector: '.article-content',
          how: 'html'
        },

        // Get attribute value of root listItem by omitting the selector
        classes: {
          attr: 'class'
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
```

Added in v0.2.0
