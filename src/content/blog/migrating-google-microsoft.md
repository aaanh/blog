---
title: "Migrating from Google Workspace to Microsoft 365"
pubDate: "2023-02-12T18:30:00"
tags: ["google", "microsoft", "cloud", "migration", "enterprise"]
draft: false
description: "Unironically a better solution from the lesser evil."
---

## Background

Around April 2021, I created my Google Workspace account and subscribed to the Business Standard plan which cost 15.60 CAD per user per month. The offerings that I sought after the most were:

- Custom email domain
- `2 TB` of storage per user
- and... I think that's all

The Google productivity suite is already good enough on my Google One subscribed personal account, so it did not really affect my choice of cloud platform that much. Although the unlimited Google Meet with 150 participants sounds good on paper, in reality, I did not and have not touched it, bar 2 - 3 times for student club meetings.

Given the majority of email users nowadays use Google Mail as their provider, one positive note is that the interactions between users are quite smooth in terms of file sharing on Google Drive, which comes with every account.

In the beginning of 2022, I switched from the Business Standard plan to the Business Starter plan which cost half the price per month to reduce my spending and in anticipation for the very near-coming market stagnation. This comes with a major reduction for the Drive capacity per user, from `2 TB` to a meager `30 GB`.

Prior to my migration to Microsoft 365 today, there are 3 domains with multiple aliases on Google Workspace.

After researching the plans offered on Microsoft 365, I have concluded that the benefits of M365 over Workspace.

## Rationale

### Costs (before tax, in Canadian Dollars)

Google Workspace (GWS) Business Starter: 7.80 per User per Month

Microsoft365 (M365) Business Basic: 6.00 per User per Month

### Offerings (cheapest plan)

These are the offerings that matter to me the most.

_Be warned: These are mostly L's for Google..._

|                                       |           Google           |                    M365                     |
| ------------------------------------- | :------------------------: | :-----------------------------------------: |
| Email Domain                          |            Yes             |                     Yes                     |
| Email Storage                         |   Part of Cloud Storage    |                    50 GB                    |
| Email Aliases (diff. domains)         |       Yes (`<=` 50)        |               Yes (`<=` 400)                |
| Cloud Storage                         |           30 GB            |                    1 TB                     |
| Productivity Suite Type               |            Web             |                     Web                     |
| Productivity Suite                    |           IYKYK            |            Office is better, tbh            |
| MFA                                   |   Yes, any authenticator   |       Yes, any auth, best with MSFT's       |
| MFA w. Security Key                   |            Yes             |            Yes, but never shows             |
| MFA w. Number Matching + Location     |             No             |                     Yes                     |
| Collaboration (real-time, externally) |  I'll just use Google One  |             A lot to be desired             |
| Chat app                              | Use Discord or Slack, dude | Teams is so-so but best one out of them all |
| Cloud Infra                           |   Google Cloud is a pain   |     Azure is also a pain but manageable     |
| Support                               |             😂             |                     🤔                      |
| Feature documentations                |        I hate them         |                   Usable                    |

### Conclusion

As you can see, M365 offers a lot more bang for your bucks at an even cheaper price, so it is completely logical to migrate out of GWS, saving 1.8 dollar a month towards my daily intake of coffee. Especially so when you look at the cloud storage of 1 TB versus a meagre 30 GB (that's 33.33 times the amount of storage).

Unfortunately for Google, Microsoft has reached the pinnacle of economy of scale. Love or hate Microsoft and their way of collecting user information, it is certainly clear what the more economic choice is.

Another aspect to consider but I didn't include because I thought it wouldn't matter that much is Single Sign On (SSO) integration with third-party applications. Through what I could observe, there are more applications with Google SSO than those that have Microsoft. However, at the end of the day, there are ways to integrate your own domain SSO through APIs without first-party support (done by the application owner). So, unless it is a major inconvenience to you (lack of internal resource, fundings, etc.), I wouldn't take that into consideration.

## Migration

The migration process is mostly performed on M365 Admin Center. Everything looked straightforward enough until it wasn't and I think both parties (G and M) are to be blame.

The first-party migration tool on M365 Admin Center was simple to go through the steps. It involved creating a service account on Google Cloud that can manage Google Workspace in ELI5 terms. An M365 migration application is installed on Google Workspace to use the service account to perform the process. However, during the verification step of the service account's permission, M365 keeps throwing error saying that there's insufficient permission to continue. I had tried everything, going so far as to giving all the permissions I could get my hands on.

Post-mortem-ly, Google's way of managing the service accounts is too confusing and I was in deeper than I had wanted, reading through countless docs and troubleshooting forum threads. Microsoft, on the other hand, could improve their toolings, but it does disclaim that the tool is still beta.

In the end, I had to manually migrate everything.

### Cloud Storage

This involved downloading the Google Drive data (9 GB total, doable) and exporting all my mails. Nothing to write home about.

### Emails

For the e-mails, they are exported as a single `.mbox` file (all mails concatenated into a single file, including the header). This is widepsread file format on POSIX systems, so Google Mail does the right thing here. However, Microsoft Outlook does not support `.mbox` file 😂 Why? Because it uses `.eml` which is a format that is developed by Microsoft, duh. `.eml` stores each mail in one file, though. Honestly, not that big of a deal, I imported the single `.mbox` file to Thunderbird (bless Mozilla) and exported as `.eml` files.

### Calendar

Nothing special. Exported as `.ics`, pretty standard. Outlook can read and import just fine.

### Documents

Because Drive doesn't let you change ownership to users outside of the domain (a la my-personal-account), every document that I have shared so far to anyone must be manually uploaded to my personal account and re-shared. I made duplicates with my personal drive wherever I can, but I could only do damage control to an already sinking ship. I had to manually re-share the stuff.

## 2 Weeks' Use Review

At this point, I am very much used to Microsoft products and its Azure AD, so I am biased when I say that everything works perfectly fine so far. The ability to use the desktop Office version is a nice-to-have (with the first free month of trial) but not a necessity if all you do is what you would do with Google suite.

A caveat that I encountered during my domain transfer was that the Exchange Admin Center bugged out. Even though the DNS records had been added for 3 hours, Exchange would still not recognize the domains as authorized. Some of which are quite mission-critical which I transferred last because I could try with my other domains first while maintain the email available should anything be sent my way. I got impatient so I removed the domains that were pending and readded them through M365 Admin Center which did the trick.

After everything, I'd rate Google 6.5 out of 10, Microsoft 8.5 out of 10, migration process 3 out of 10. Would I recommend doing it? Probably not by yourself. Hire a certified professional to do it for you and save the headaches for a security breach or something.
