---
title: 'Google Cloud Platform Bonanza - Cloud Run'
pubDate: '2022-07-02T00:30:00'
tags:
  [
    'serverless',
    'gcp',
    'cloud-run',
    'firebase',
    'devops',
    'docker',
    'container',
    'networking'
  ]
draft: false
description: 'Why do you have to be this way?'
---

> Curse-loaded rant alert.

# Introduction

[Google Cloud Platform](https://cloud.google.com) is Google's the direct competitor to [Microsoft Azure](azure.com) and [Amazon AWS](https://aws.amazon.com). Among the services GCP offers is the Cloud Run API. Cloud Run hosts containerized applications, APIs, and microservices while being jam-packed with features like security, access control, port forwarding, loggings, and etc.

<img src="/blog-content/devops-gcp-cloudrun.png"></img>
_Fig 1. The dashboard of a deployed Cloud Run project_

The Cloud Run service and platform are able to differentiate themselves from the others by offering a relatively modern and clean console which helps a lot with navigating through the options and functionalities. Compared to GCP, AWS and Azure seem clunky and the UI flow does not offer a clear path for a developer to deploy their projects. Most importantly, when enabling these services, AWS and Azure have complicated billing account assignment that just throws the user off track.

# The spiral into despair begins

But Cloud Run is not without its own flaws. Very annoying ones at that. In my use case, I have a container of a Fresh Deno app (you can visit it [here](https://fresh.hoanganh.dev)) that I want to deploy with Cloud Run. It is web application framework that uses Deno (instead of node) as its runtime. Other than that, it is basically a single-page application. I started by building my container image locally and tagging with the proper scheme. Then, I used the `gcloud` CLI to integrate the Google Container Registry with Docker so that when I push an image with the correct tagging scheme, it will be pushed to the registry without much overhead of managing accesses and tokens. Smooth sailing so far.

After it has been uploaded to the registry, I can use the Cloud Run API console to deploy the container. With the default options set, unauthenticated web access granted, and proper port forwarded, off the service goes. First thing, there is no way to see what the API is doing with the image. The log verbosity is non-existent and the log tab is only for operational logs. So, no actual progress bar whatsoever and you would need to have your fingers crossed that nothing goes wrong. This happened to me the last time when I tried to deploy my [Unix documentation site](https://unix.hoanganh.dev). The deployment went under and I did not know why because the error message was simply a build error because of unsupported architecture. After doing differential testings, I was able to isolate that the problem was due to the base image architecture. See, I was using my M1 MacBook to build and push the image so the base Ubuntu image was on ARM64 architecture. This was subsequently solved by going over the process on my x64 machine.

Second, there is an option to assign a custom domain to the deployed container and this step is also a major pain. While the assignment of the custom domain went quickly enough, the lack of observability on the progresss is absolutely nerve-wracking due to the undesirably slow DNS propagation and SSL certificate generation. Mind you that I use Cloudflare. So, in my quest to find a better way to do custom domain (because the default `*.web.app` is _kinda_ hard to remember 🤡), I stumbled upon Firebase hosting with redirection.

# Firebase kinda sucks now

Now, Firebase is a seemingly separated service component from all the over GCP stuff. But you can connect Firebase to your GCP project. BUT. I didn't know that was a thing, so I naively created a new project with the hope of being able to redirect to the container service of another project 🤡. Fumbled around a while, I managed to connect the GCP project of the deployed container to Firebase, but then it automatically upgraded the plan to the Blaze paid plan because "extend to use Google Cloud Platform resources" for whatever reasons. Well, ok, fine, I can live with that as long as the process takes less time. Boy, was I wrong, as I could not implement the redirection even though I followed the documentations and referenced other deeply nested docs.

All right, I give up. Let's abandon this and disable the Firebase then. Google says, "Fuck no." This project is now permanently attached to the Firebase shit and there are no options to detach. I attempted to downgrade the Firebase to the free plan with hope that it would do the trick only to have it RE-ENABLED automatically by the system. At this point, the last thing to do is to delete the project from Firebase console and you'd think that is "da wey" right? Fuck no, again, you silly goof. Delete the project from Firebase also means your whole Google Cloud Platform project would be deleted. Trying to get support for this shit doesn't work because it is not available for the basic tier support 🤡.

> THE FUCK SHIT IS THIS?
> I _calmly_ asked myself and Google.

# Last ditch efforts

Ok, whatever, then I'll just remove the service accounts in IAM. Wrong again, idiot with a foolish ambition. Removing those automatically created service accounts also somehow messed up the whole Cloud Run API access permissions. Now, I can't even create a new deployment from the web console nor deploy a revision of the containerized app. Trying to solve this via the IAM console is another pain. Google in its infinite engineering wisdom does not provide a clear way of how administrators can manage access of default service agents and their roles. After 1-1.5 hour of reading docs, forums, community pages, I gave up and had to disable the whole API, losing all of my work, and start over.

# Resolution

Starting over actually did the trick. The access policies were restored and I was able to re-deploy everything through the web console. HOWEVER, IT DID NOT HAVE TO BE THIS WAY. The time and effort cost was simply unjustified for such simple administrative operation. And it is not like the service is free or anything, I (will) pay for whatever I am consuming, so the shitty docs and non-existent support can go fuck themselves. Twice. Google engineering might be the best, but the customer service and business relation is clearly dogshit. If anything, I will probably sell my soul to Microsoft in the future.
