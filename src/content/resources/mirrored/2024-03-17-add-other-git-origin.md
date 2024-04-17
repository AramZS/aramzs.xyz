---
title: Adding and using another git origin
growthStage: budding
tags:
  - Programming
  - CLI
  - Git
---

For sites like this, I manage my own primary origin repo, but I have another origin from [photogabble.co.uk](https://photogabble.co.uk). I can both use improvements from that upstream repo and contribute improvements back to it, but in order to do that, I need to be able to manage multiple git origins.

```sh
git remote add upstream git@github.com:photogabble/website.git  
```

Will let me add the other remote repository. This gives it the name `upstream` so in the same way you might `git push origin branchname` now I can do `git pull upstream branchname` to pull from the other repository.

```sh
git remote -v
```

This will show me the new fetch and push options. Like so:

```sh
origin    git@github.com:AramZS/aramzs.xyz.git (fetch)
origin    git@github.com:AramZS/aramzs.xyz.git (push)
upstream  git@github.com:photogabble/website.git (fetch)
upstream  git@github.com:photogabble/website.git (push)
```
