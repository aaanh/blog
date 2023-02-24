---
title: 'Self-hosted: Go big or go... home?'
date: '2021-08-25T14:30:00'
tags: ['hosting', 'virtualization', 'server', 'linux', 'networking', 'sysadmin']
draft: false
summary: 'Cloudy with a chance of hosting'
---

## Preface

Deployment is like a drug. Once you get that first taste of starting up a server and expose it to the interweb where you could practically access it anywhere, you will never be able to stop. I know that I have grown addicted to all this ever since my first deployment on AWS EC2 (which drained my pocket dry for some months). I had to shut down my websites and web services for a year or so. Then, the new age of the interweb finally reached and enlightened me. The spawn of free web application deployment and hosting services, like Gatsby and Vercel, and the shining jewel of affordable webhosting Linode had once again lit a fire under my butt.

## Setting up a code server

[Code Server (Password-protected)](https://code.hoanganh.tech)

Code server, in a nutshell, is a visual studio code environment that is hosted on a remote server and accessed through client server. The code server is installed on a Linux-based OS with the Linux shell exposed so that many of the software development processes can be run natively. Although there are some catches when using a custom domain name like I do, such as front-end web frameworks and backend webapp servers that utilizes the localhost&colon;&lt;port&gt; to serve the development build requires additional setups. And I skip the hassle of setting up the correct port forwardings because I only use it for code editing anyway, while the deployment preview is handled by external services that pull and from github pushes and commits.

The best use case of having a code server is that you can basically (edit) code anywhere without going through the strenuous process of setting up a local development environment on whatever temporary platform you use.

See the code server running on Chrome below:

<img
  src="https://lh3.googleusercontent.com/AdEHpUUTC1BK7Smsg4jAi3cEadKR6qtvv0GMxtVRui0L83viwc7A6NlZveuzMJI2Hd5d_oBX4gRwMg0_BzbjQaCOa4CbznC8KXe9LiqE4bq4uFZ9OwQsc0dbAPmjCbrxBTOiCxVQ84e8HeqMdkuzqE2IQjImKGnOq0wL4oxwnYIr838DDx_I4vPrl5msL7hY9ILB83IRlnKseezX9OVDZSBEWcjhivPIPZyg8txP5QrMYutczM7AeNBrUhi8W-rfKdzn1SoC5rd_PklmpUZann-XQYYa1yc_rBL7hUEaLas0fGw9kWpC50GyGFW-tbnQ_7ehpk1lj4M2QLRV3Fmyb-BuRM63M8l9R4a_FWEikzDb-JLl8fGAyw9AQOy_q4f0Q5Q_3hRaHCeFsjJQFdQM3i_9ijeGH05MyrmApQO-PAipaawP9S9OQGNG3ux6T5Ay4aNFBVXA-7v3zi9eGlwMeGJ0kpIfMxcHy-EwwtfUSEXpeXD1fhfCSL8jL8vuGGyWrd-Y5wlMESFlEo1PYpiZRIp78fctCTfeU2Jss9JExK2VhTNr4Ub_h8ojNc7ume7Hxojh1rkLAttg2xw7xC6_hmApy4KY7f__qA7CbbRdiLW3H2aQifMlIFmMfIzaZ2DgEOdofpjynRJ198WsbZrD3CXwDPiV_BnPNpoEqLy6VcUfneL82B5Rs92O3h52sdi4OqtmJzjjWVKcXRYI_9JZoXvnhQ=w1920-h1080-no?authuser=0"
  style={{ width: '630px' }}
/>

Setting up a code server is rather easy. There are many tutorials on Google search results I have tried that work perfectly. But since I have already joined the cult of Linode, I simply spin up a code server template from Linode's marketplace. The process probably took at most 10 minutes, while the SSL cert was the more PITA thing to do.

## The Minecraft server

(TBA)

## The VPN servers

(TBA)

## The Homelab

[Currently serving a static HTML on `linux.hoanganh.tech`](https://linux.hoanganh.tech)

[ssh and xrdp can be accessed through `homelab.hoanganh.tech`]()

Hosting a homeserver at home that is accessible to the interweb requires your ISP to provide you with a static IP, which was impossible before at my previous apartment because I was not the internet account holder nor was the router placed in my room. Now, I am able to reserve my own IP to the interweb, route that through Cloudflare et voila.

In details, it was a bit more complicated. Currently, I have 2 ports forwarded for Remote Desktop Protocol, one for my Linux server GUI and one for my Windows workstation, which are pointed at by 2 CNAMEs configured on Cloudflare: `homelab.hoanganh.tech` and `home.hoanganh.tech`. Then, a third CNAME, `linux.hoanganh.tech`, points to the static web server nginx running on the same Linux server. Introduce the brainfuckery, they are all routed through 1 single IP provided by the Internet Service Provider (ISP). So, for each of these servers/services, I must use separate port. For example, (X)RDP on Linux server is forwarded to port 0001, RDP on Windows is 0002, HTTP on Linux is 80(80), and HTTPS on Linux is 443, and so forth. Took me a while to figure that out and configure on my local machines, on the ISP router portal, and on Cloudflare.

## The mail server

[`iam(at)hoanganh(dot)tech`](mailto:iam@hoanganh.tech)

Initially, I set up the domain with Zoho mail. But because I don't use any of the services that Zoho offers, I migrated everything to Google's G Suite (now Google Workspace). The setup was painless. All I needed to do is copy-paste some MX and DKIM values provided by Google and onto Cloudflare DNS.

Well, there's always a catch, isn't it? The catch for migration is actually migrating old emails from iCloud and Zoho servers to their new home on Google Workspace. First of all, I have to add the Zoho account to Thunderbird client. Then, I retrieve all the mails from the Zoho account. Finally, I export them to file which I then upload to Gmail. Now, for the iCloud mail, I use the Mail app on macOS to export all mails, which took a day, then upload the exported file to Gmail. Boom. Done.

The Google Workspace plan that I use is the Business Standard which the following perks:

![](https://lh3.googleusercontent.com/U6Yos6bn1ATdLNzTKgvaqNkb11lKri1icGeweG_zcim0HFuKMfNq2yaGYiDSvJd_wDI9yr_EKd5SSZ8X8No26MwqeNK6SsKo5kAESxBwxTfUwakEmcHWBvar6Um__skEa-pl5OR7lx6t6qk3BRPKzyCM8wbagWBEzc4c4VRlPbHsxHnPJxdsrE6M90kUBHrp9lv9fMef5zQQfyvFtjDKcbC9wktWsVNC_lbpBe_bAOrPileSCQxYpKbLF_uCnamaQl3zkfProuxYxs1XuWyrDjwd8w8Z1nL1KG1mTIiUuWr6zMUrDdjJx-GyYicUVoamSf1RowUMmcgsQG-A9k6TAB8Le7YvKtm-wxFJSEB9BEKGzVHT2orhYc6VWWBwZ0ypFoyN4YiFopIFPvuusuVyYM_ywohJhUtn49dyoPGAo0C3cvynbIEVaCvRwE9T0tKPuOxWr9RkuNQIH2ZOF1Kf7Fb-h1tKlH1pPtnjhlBCI_KNRELCvOfHtjHwCL8lChUJQpj4mYyS_g1XHdkQ7MJYZibvKzDKLCmWHz33YHuK7WVYtuJebPVa6luU_NdNFzN-oLB5xp3BkzERStn7HCFUwisgzYxq_9nDYQICQlmM1zY_GvGot3y4OGi4nTzxj_RG7eP5A_-gCibYO4tqFVP1Dj7FJE-NgOCNqxjqQZUOuwY5ctseuh1gHqO3c12Vz-jS51H214LWntSCkGF4kdKjDrsLaA=w576-h1354-no?authuser=0)

My target is to get the 2TB of cloud storage so that I could store my po... photos and videos of cats. In all seriousness, mainly important documents and auto HQ photo backup. I might switch to the Business Starter plan which costs half the price, but 2TB is really nice to have.
