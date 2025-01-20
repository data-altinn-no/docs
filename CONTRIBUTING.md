# Contributing to data.altinn.no docs

The Altinn docs site is generated from [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 
using the [Hugo](https://gohugo.io/overview/introduction/) static site generator.
We use YAML as front matter.


## Initial setup

1. Download and install [Git](https://git-scm.com/downloads) and clone the [docs repository](https://github.com/data-altinn-no/docs) to a local folder:
```bash
git clone https://github.com/data-altinn-no/docs
```
2. We recommend downloading and using [visual studio code](https://code.visualstudio.com) with [this extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) for editing markdown.
3. [Download Hugo](https://github.com/gohugoio/hugo/releases) (version **[v0.79.1](https://github.com/gohugoio/hugo/releases/tag/v0.79.1)** or newer) for your platform, and place it in the docs-folder.

## Build / Edit / Test

1. Open the docs repo-folder in visual studio code (or another editor)
2. Run `hugo server --navigateToChanged` or click "Altinn docs" (Ctrl-Shift-D) in vs code. This generates the site and opens Chrome at http://localhost:1313/docs/
3. Edit and save a file in the `content`-folder to get a new local build of the site refreshed in your browser.

## Deploy
Whenever changes are pushed to the docs-repository, an automatic deploy is updating https://docs.data.altinn.no

If you don't have write access to the docs-repo, you need to [create a fork](https://help.github.com/articles/fork-a-repo/)
and submit a [pull request](https://help.github.com/articles/about-pull-requests/).

## Links

 - [Markdown cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 - [Hugo configuration](https://gohugo.io/overview/configuration/)
 - [Hugo front matter](https://gohugo.io/content/front-matter/)
 
