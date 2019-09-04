---
title: index.ts
nav_order: 1
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [ScrapeInput (接口)](#scrapeinput-%E6%8E%A5%E5%8F%A3)
- [scrape (函数)](#scrape-%E5%87%BD%E6%95%B0)

---

# ScrapeInput (接口)

**签名**

```ts
interface ScrapeInput extends ScrapeOptions {
  url: string
}
```

# scrape (函数)

Scraper

**签名**

```ts

export const scrape = <T>(input: ScrapeInput): MonadNode<{ data: T }> => ...

```

**示例**

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

v0.2.0 中添加
