---
title: "Automated Development Pipeline"
pubDate: "2021-12-28T20:30:00"
tags: ["ci", "cd", "github", "actions", "automation"]
draft: false
description: "Allows room for periodical laziness."
---

I have successfully taken the first steps towards automating my development process. The automated process is applied to 2 projects, 1 of which is my own unix wiki publicly available at [https://githuh.com/aaanh/linux-docs](https://githuh.com/aaanh/linux-docs) with its homepage at [https://unix.hoanganh.tech](https://unix.hoanganh.tech), while the other one is a private wiki project and therefore not exposed to public network.

The primitive automation relies on Github Actions. Once a new commit or a feature branch is merged into the production branch, Github Actions will be triggered and it will spin up a build environment that is specified in the `./github/workflows/main.yml` file. I will talk only about the process for the public wiki project but the private project follows somewhat the same principals.

The unix wiki is hosted on a Ubuntu server on Linode, so the first hurdle to overcome is how to "sync" new changes to the server with just the event of pushing new commits to the production branch. Luckily for me, features and functions within this space of technology have developed enough to let me have my ways without much hassle.

The wiki site is built using the sphinx-doc tool that can generate static webpages completed with table of contents and hyperlinks from markdown sources, while incorporating theming and other features using `pip` modules. So, the process would look something like:

```txt
local changes > push to origin > github actions voodoo to build > "sync" build results to /var/www/... on the Ubuntu server.
```

Github Actions shares similarity with docker in terms of configurations so writing a config file for the build process is not that difficult. Github Actions is actually the 3rd option that I tried, after Cloudflare Pages and Vercel. For some reasons, Pages and Vercel build configs and environment (presumedly, debian-based) do not have what is needed to build sphinxd-docs. In addition, the restrictive nature and non-granularity of the configs prevents me to properly debug the failed builds. Therefore, I finally land myself at Github Actions (hereforth referred to as Actions).

As said before, Actions functions similar to a docker container. Therefore, I need to specify what image to load and the Ubuntu image works perfectly because it features an environment and a package manager that I am confident with. Below is the content of the `.yml` file for better visualization:

```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    branches: [prod]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.LINUXHOANGANHTECH }}
          known_hosts: "placeholder"
      - name: Adding server to known_hosts
        run: ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
      - name: Checkout repo code
        uses: actions/checkout@v2
      - name: Install Sphinx
        run: sudo apt install python3-sphinx
      - name: Install pip
        run: sudo apt install python3-pip
      - name: Install pip dependencies
        run: python3 -m pip install -r requirements.txt
      - name: Generate build with sphinx
        run: make html
      - name: Rsync to server
        run: rsync -avz ./build/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/var/www/html/build/
```

The build steps are easily constructed as a line by line bash script and each steps can be further described with a name and that name is echoed during the build for better debugging insights. Here is a run through of the how the process works:

1. Pre-configs: build environment secrets are added to Actions: ssh-key, IP address, pathing on the server, and other credentials.
2. The seceret SSH key is installed by using an action I found on the marketplace. This key is used to, you've guessed it, establish an SSH connection with the host server.
3. The repo code is then checked out.
   - Note that it is not the same as cloning the repo into the build environment.
4. The build dependencies are installed through `apt` and `pip`.
5. The `make` command is run to generate the static site files.
6. Rsync is used to transfer the build files to the host server directly through the `ssh` connection to its public IP address on Linode.
   - Note that this public IP is also added as environment secret and site is actually proxied through Cloudflare.

And that is the end of the process. Originally, I have wished for it to be this way for a long time already but only now do I have the capacity, knowledge and time, to finally set up the very basic pipeline.
