---
layout: single
title:  "Creating a Private Fork of a GitHub Repository"
date:   2022-04-08
excerpt: "Simple steps commands to create a private fork of a GitHub repository."
header:
  image: /assets/posts/programming/private-fork.png
categories:
    - programming
tags:
    - git
    - github
toc: true
---

I have found myself forking repositories quite frequently recently for school projects and research, and most of the time I have wanted to keep them private on GitHub. It is not that straightforward, so once I figured out the right way to accomplish it I started honing [this Gist](https://gist.github.com/ellisbrown/b880f46c25af40be0b0f0bd280ca7155) to remind myself of the right steps.

After using it for the umpteenth time this year, I realized that the Gist had basically turned into a mini blog post 😅, so I thought I'd just post it here in case it can help any one else trying to accomplish the same!


## Basic Steps

1. Create a new [private repository on Github](https://help.github.com/articles/creating-a-new-repository/)
   <img src="/assets/posts/programming/private-repo.png" style="max-width:600px">


2. Fork the repo (`BASE_REPO`) to your new private repo (`PRIVATE_REPO`) as follows:
    ```bash
    BASE_REPO=<BASE>  # repo you are forking
    PRIVATE_REPO=<PRIVATE>  # your new private fork repo

    # Create a bare clone of the base repo
    git clone --bare $BASE_REPO

    # Mirror-push your bare clone to your new private repo
    cd ${BASE_REPO##*/}
    git push --mirror $PRIVATE_REPO

    # Remove the temporary local repository you created in step 2
    cd ..
    rm -rf ${BASE_REPO##*/}
    ```

---

## Recommended Additional Steps

`cd` to your preferred workspace, then clone your private fork
```bash
git clone $PRIVATE_REPO

# add the original repo as remote to fetch (potential) future changes.
git remote add upstream $BASE_REPO

# disable push on the remote (as you are not allowed to push to it anyway).
git remote set-url --push upstream DISABLE
```

* You can list all your remotes with `git remote -v`. You should see:
    ```
    origin	<PRIVATE_REPO> (fetch)
    origin	<PRIVATE_REPO> (push)
    upstream	<BASE_REPO> (fetch)
    upstream	DISABLE (push)
    ```
* When you push, do so on `origin` with `git push origin`.
   
* When you want to pull changes from `upstream` you can just fetch the remote and rebase on top of your work.
  ```bash
    git fetch upstream
    git rebase upstream/main
  ```


Additional information on creating a private fork by duplicating a repo is documented [here](https://help.github.com/articles/duplicating-a-repository/).