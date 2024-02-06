---
layout: post
title: "Creating a Private Fork of a GitHub Repository"
date: 2022-04-08
description: "Simple steps commands to create a private fork of a GitHub repository."
header:
  image: /assets/posts/programming/private-fork.png
categories:
  - programming
tags:
  - git
  - engineering
toc: true
comments: true
redirect_from:
  - /programming/git-private-forks/
related_posts: false
---

I have found myself forking repositories quite frequently recently for school projects and research, and most of the time I have wanted to keep them private on GitHub. It is not that straightforward, so once I figured out the right way to accomplish it I started honing this post to remind myself of the right steps. Hopefully it helps any one else trying to accomplish the same thing!

## Basic Steps

1. Create a new [private repository on Github](https://help.github.com/articles/creating-a-new-repository/)
   <img src="/assets/posts/programming/private-repo.png" style="max-width:600px; margin: 0 auto; display: block;">

2. Fork the repo (`BASE_REPO`) to your new private repo (`PRIVATE_REPO`) as follows:

   ```bash
   BASE_REPO_URL=<BASE>  # remote URL of repo you are forking
   PRIVATE_REPO_URL=<PRIVATE>  # remote URL of your new private fork repo

   # Create a bare clone of the base repo
   git clone --bare $BASE_REPO_URL

   # Mirror-push your bare clone to your new private repo
   cd ${BASE_REPO_URL##*/}
   git push --mirror $PRIVATE_REPO_URL

   # Remove the temporary local repository you created in step 2
   cd ..
   rm -rf ${BASE_REPO_URL##*/}
   ```

---

## Recommended Additional Steps

`cd` to your preferred workspace, then clone your private fork

```bash
git clone $PRIVATE_REPO_URL  # clone the private fork
cd ${${PRIVATE_REPO_URL##*/}%%.git}  # cd into the cloned directory

# add the original repo as remote to fetch (potential) future changes.
git remote add upstream $BASE_REPO_URL

# disable push on the remote (as you are not allowed to push to it anyway).
git remote set-url --push upstream DISABLE
```

- You can list all your remotes with `git remote -v`. You should see:

  ```
  origin	<PRIVATE_REPO_URL> (fetch)
  origin	<PRIVATE_REPO_URL> (push)
  upstream	<BASE_REPO_URL> (fetch)
  upstream	DISABLE (push)
  ```

- When you push, do so on `origin` with `git push origin`.

- When you want to pull changes from `upstream` you can just fetch the remote and rebase on top of your work.

  ```bash
    git fetch upstream
    git rebase upstream/main
  ```

| **_Note:_** `##*/` and `%%.git` are some bash [variable mangling](https://www.linuxjournal.com/article/8919) to extract everything after the last `/` in the URL and before the `.git` respectively.

Additional information on creating a private fork by duplicating a repo is documented [here](https://help.github.com/articles/duplicating-a-repository/).
