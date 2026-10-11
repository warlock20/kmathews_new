---
title: How to write an article on this site
summary: A reference for the Markdown conventions this site supports. It lives in _drafts, so it is never published; preview it with --drafts.
categories: notes
tags: [notes, meta]
math: true
changelog:
  - "2026-09-27 — first version of this guide."
---

Copy this file into `_posts/` as `YYYY-MM-DD-slug.md` to start a new article. The front matter above shows every field the article template reads.

## Front matter

| Field | Required | What it does |
|---|---|---|
| `title` | yes | The headline. Use sentence case. |
| `summary` | recommended | One sentence, shown as the italic dek, in lists, and in link previews. |
| `categories` | yes | The first URL segment, e.g. `/linux/slug/`. Keep it to one lowercase word. |
| `tags` | recommended | A list. Each tag becomes a filter on the Writing page. |
| `updated` | no | A date. Shown as "Updated" next to the published date. |
| `math` | no | `true` loads MathJax on this page only. |
| `toc` | no | `false` hides the contents list. It appears automatically with two or more `##` headings. |
| `changelog` | no | A list of short notes, shown at the end of the article. |

## Code

Fence code with a language for highlighting. Add a filename with a kramdown attribute on the line after the closing fence:

```c
// SPDX-License-Identifier: GPL-2.0
#include <stdio.h>

int main(void)
{
    unsigned long count = 42;   /* a comment */
    printf("frames: %lu\n", count);
    return 0;
}
```
{: data-file="hello.c"}

Shell sessions use `console`, so the prompt is not copied:

```console
$ gcc -O2 -o hello hello.c
$ ./hello
frames: 42
```

Inline code looks like `iw dev wlan0 survey dump`.

## Callouts and footnotes

> Use a note for context the reader should not miss.
{: .note}

> Use a caution for something that can go wrong or break.
{: .caution}

Footnotes go at the end of the article, under Notes.[^1] A plain blockquote stays a quote:

> Every latency number answers a question.

## Figures and maths

<figure>
<img src="/favicon.svg" alt="The KM monogram" width="96" height="96">
<figcaption><strong>Figure 1.</strong> Captions are set in the mono face, under the figure.</figcaption>
</figure>

With `math: true`, write display maths between double dollar signs:

$$
\Delta t_i = t_i^{\text{exit}} - t_i^{\text{enter}}
$$

and inline maths such as $$2^b \le \Delta t_i < 2^{b+1}$$ inside a sentence.

[^1]: Like this one. The ↑ link jumps back to where you were reading.
