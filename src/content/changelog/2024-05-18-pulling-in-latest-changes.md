---
title: "Pulling in latest changes"
tags:
  - Blogging
  - Code
  - Git
growthStage: seedling
---

This latest update pulls in the most recent fixes and [changes from the PhotoGabble site](https://github.com/photogabble/website). 

Specifically spotted the use of `clamp` in the CSS to fix some of the sizing weirdness for post titles and really liked it. 

For the curious I set the `photogabble` repo as a git origin to my own development environment and use `fetch` to pull down the latest branches and changes. Then I can use `cherry-pick` to pull in the specific git hashes and co-commit them to my own repo. 
