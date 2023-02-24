---
title: 'Security or Convenience'
date: '2022-01-18T20:30:00'
tags: ['secops', 'security', 'bots', 'ddos']
draft: false
summary: "Can't be too secured or else I'd be better off in a prison cell."
---

## Preface

After my internship in the Fall (as in Autumn) of 2021, I have drastically become more ~~anal~~ diligent about securing my digital interactions. Ignorance had been a bliss up till then, but now that I am enlightened about the threats looming in the cyberspace I will forever be consumed by the urge to secure every aspect of my footprints on the interweb.

## State of the union

> Note: I won't be citing or quoting sources because these facts are either intuitively observed, or they are generally known and can be looked up easily.

With the world moving online for the pandemic to continue their study, work, and entertainment, the rise in usage of internet-based services and information exchange platform generates goldmines that are ripened for the taking by cybercriminal organizations. According to my very trusted sources, Reddit and maybe the CVE feeds, I have observed that almost every day there are new cool exploits discovered here and there in various systems, be it enterprise or hobby open-source or your mom's newly purchased smart doorbell and toaster oven. Among those are critical 0-day vulnerabilities that could be on probably more than 3 billion devices, leaving them stripped naked, taking on full-frontal assaults from the wild and rough attacks from threat actors (I've been watching too much penguinz0).

Aside from the inadequately secured and monitored systems, the userland is not looking any less bleaker. Untrained or unaware users with the art of cyber-war from Sun Tzu, the hackerman from 544 BC (birth-year-src=wikipedia), are primary targets for social engineering attacks like phishing, MITM, or straight up brute-forcing the credentials because 'password123' is so easy to type and remember.

For me personally, I have my physical and digital information ~literally littered~ everywhere, except the TikTok cesspool. So, it is my due diligence to secure my data online. In terms of attack surfaces, I have from the very basics everyday-Joe like emails and (social) accounts to mad-lad infrastructures like private emails, compute servers, and DNS are basically lying there waiting to get hacked by whatever methods.

## Methods of Securing

First topic, account passwords are practically deprecating technology since they are not dynamic, crackable (albeit might take time), and cumbersome (for each account in 100_accounts: set new_password). Although there are pushes from the industry for passwordless authentication, based on what the currently available technologies, such authentication method does not bode really well since the integration and implementation progress is barely catching up. So, password is here to stay and quite frankly unavoidable. I have no choice but to secure the passwords as well. From my understanding, there are just 2 main ways to secure the ye olde password: complex and long strings, failsafe with Multi-Factor Authentication. I don't include solutions like password managers because they still need a complex master password and an authentication code which are basically the same thing. I also lump using key-pairs into the password diaspora since they could easily be stolen as a (crackable) binary/ASCII/etc. format. So, I use non-dictionary strings with complex characters as password while retroactively changing old passwords up to my current personal standards. In addition, I enable MFA on every account where I could. As crazy as it sounds, there are still systems without MFA capabilities or systems with MFA loopholes; then, the only line of defense is from the character strings. Regarding setting up MFA, there are still many improvements to be made with the authentication process to make it more convenient and thus more prevalent among end-users. Putting on a phone is a good convenience. I also recently tried Smart Card PIV, using a yubikey, to generate auth tokens on desktops which a tad bit more convenient because I don't have to pick up an external device that would break away from that contemporary context (context switching is really expensive!).

Second topic, hardware and servers need to be secured as well. If they were to be accessed and used by attackers, that action would incur infrastructural and maintenance costs and might as well sully my identity and create distrust among whomever I am in communication with. Of course, managing access to those systems are already secured by the aforementioned auth methods, but there could be loopholes and exploits that simply bypass the need for authentication. The situation surrounding these systems is always evolving: this vulnerability is patched, another vulnerability pops up. To achieve a perceived sense of a secured system, I keep my systems as up-to-date as possible without completely breaking stuff down in production. I employ SSL on exposed protocols like http(s), rdp/rds, key-pair and fingerprinting for ssh connections, etc. I set up firewall for all systems and filter IPs as well as monitoring through a tool for suspicious activities.

Third topic, it is important to obfuscate paths to whatever resources or systems that I deploy and expose online. For example, I am assigned a private IP for my home internet that I can forward local services and resources like remote desktop or ssh hosted on my stationary devices (physical servers). Now, this IP address can be used to point straight at my face from anywhere which would introduce a security risk to my personal information and private data should the threat actors gain access to my home network through whatever exploits there are. So, to obfuscate it, I route through a DNS provider with the ability to proxy access, filter IPs, block DDoS, fight bots, and apply edge routing and accessing rules. I prefer this configuration because I am not bothered with the advanced details (which instead I will probably equip myself in the future) and the cross-operations between security features, which might not be configured correctly, incur technical debts, and grow into a pain in the ass to improve and maintain.

## Conclusion

That is all for my strategies for staying sane in this world.
