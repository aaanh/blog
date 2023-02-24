---
title: 'Cloudflare FTW'
date: '2022-01-31T03:00:00'
tags: ['networking', 'dns', 'ssl']
draft: false
summary: 'My whole networking infrastructure is hosted on Cloudflare.'
---

> Totally not paid to say this. I shill what I (ab)use.

# Before

I have been abusing Cloudflare (NYSE: NET) ever since the day I discovered Cloudflare, which is probably 1-2 year(s) ago. I am probably one of the living testaments to why Cloudflare stock 🚀 to the 🌙 in the one-year period. Aside from servers I have physically at home, there are also my distributed infrastructures on various cloud platforms, PaaS like Vercel and Netlify to IaaS like Linode and Compute Engine/EC2/Azure.

I initially came to Cloudflare for its Domain Name Service back in 2018. Before transferring everything to Cloudflare, the routing scenery was really bleak with pay-as-you-go service providers like routing in Googel Cloud or the Route 52 routing on AWS or from the registrar or from the hosting service. Although those providers offerred either an quick and easy way to route or a granulated control over all the settings, the feature sets were either too simpleton or too complicated or the interface was too cluttered and cumbersome (👀 at you NASDAQ:AMZN).

# After

Initially, the only service that cloudflare provides that I make use of is the DNS. Compared to other providers, Cloudflare, hereforth referred to as **CF**, provides a more centralized way of managing DNS with a UI that looks like it was actually minted in the modern day with material design. Got a server running on Linode? Route its IP to CF and assign a subdomain of my choice. Got a web application (Nextjs) running on Vercel? Simply route the Vercel nameservers to CF with the proper (sub)domain names. For SSL, most modern PaaS provides the SSL configurations so I only have to flip a switch on CF to enable the HTTPS enforcement. In terms of access, I can create rules for redirecting or blocking access on CF's side instead of doing it on the host configurations, which are prone to misconfiguration and creating security risks.

Nowadays, CF has a madness amount of services available for free on its platform. I have used a bunch of which and am liking them so far in terms of usability and ease of setup. Especially,one of which I recently discovered and tried with success is the Cloudflare Access.

# Present Day

Cloudflare Access is part of CF's newly minted Zero Trust Platform &mdash; the favorite poster child of a buzzword in the tech scene. During last month (December) seasonal break, I got into discovering CF Access to see what could be ~~abused~~ leveraged from the spanking new platform/module. To simply describe, CF Access, more hollistically referred to as 'Zero Trust', is MSFT Azure in a more infantile and watered down form. This means that it is easier to understand what's going on with the platform and I don't get overwhelmed with the amount of information/services it provides, which ultimately leads to my ability to configure CF Access for use. And have I mentioned that it's **free**? Bet neither Azure nor Google Cloud could do that.

Who is CFA geared towards? I would say that it's more for small to medium enterprises that don't necessarily require complex access control and networking systems or simply don't have the manpower and the financial means to granually configure a IAM, networking, and directory system from the ground up. The ability to quickly configure these services, albeit at the price of platform immaturity, is even more amplified when the distributive nature of the workplace during and after the pandemic comes into play.

# My (Ab)use

I have always been enthralled by the idea of having access to my workstation from anywhere. Since my workstation is Windows, the logical quick and easy approach to this would be using the built-in Remote Desktop Protocol routed through a domain name pointing straight at my home IP, assigned by the ISP. This was accomplished with just Cloudflare DNS and port forwarding on the home router. However, this approach is dangerously vulnerable to attacks because 1. The connection cannot proxied through CF DNS and thus exposed to the interweb, 2. Leaking the IP address would create a healthy attack surface for all of my home devices, including my homelab cluster. In other words, it's bad.

But, that was all I could do. An RDS server would be nice that MSFT is stingy so that costs a fortune for the license. I don't want to do VNC because that means having an extra service running on the background and at startup. I probably could tolerate unproxied connection to the workstation plus implement 2FA when connecting and SSL to strengthen the security? Welp, does not work on personal stuff because those are offerred by the RDS server.

Last night, I was perusing through CF Access documentation and saw there is an article on how to use a CLI called [cloudflared](https://github.com/cloudflare/cloudflared) to set up a Cloudflare Tunnel. Digging deeper, I found out that it supports RDP tunneling and comes with a documentation on how to do it. Jackpot: [https://developers.cloudflare.com/cloudflare-one/tutorials/rdp](https://developers.cloudflare.com/cloudflare-one/tutorials/rdp).

The way it works is that Cloudflared is run on both the RDP host and the client. This creates a private tunnel with specific ports between the two machines. The host first needs to create an application connection and add ingress for the connection along with the secret key file (generated during the creation process) in the local `config.yaml` file. The cloudflared CLI can also create a DNS record specific for this RDP routing. Then, the client can start the tunnel, routing traffic from the RDP port from localhost to target host via the (sub)domain name and the app name. Once the connection to the app on Cloudflare Access is established, the client can start the RDP session.

The extremely cool thing about this setup is that RDP connection must be authenticated through CF Access and since I have added several oauth authentication strategies on the admin panel, I could either sign in on the browser any strategy, e.g. Github, Google, etc. Once I'm signed in, the authentication is verified and the RDP session can start.

Here's a diagram I cooked up in 5 minutes to illustrate what happens.

<img
  src="https://lh3.googleusercontent.com/pw/AM-JKLW_Sw3s-3yNsSWKyMUg0WGRHSLLgGwunEh3HqADw2ki425HQJC8cbeLSkdYw4bfvMNBPMDBUA8QAWgkRAFyeMCPV9ErmY2jM2rBgJjJzcKsz93fWun2c6dWQhrlTgWwTy_dta9oq-1xFJxFh2bdrGsOVw=w2198-h1230-no?authuser=0"
  style={{ width: '640px' }}
/>
