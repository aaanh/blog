---
title: "Almost Had to RMA My Spanking New MacBook"
pubDate: "2022-04-10T02:30:00"
tags:
  [
    "mac",
    "tinkering",
    "linux",
    "asahi",
    "hacking",
    "hardware",
    "test-drive",
    "os"
  ]
draft: false
description: "But I managed to recover everyting in the end 😂"
---

So... the curiosity finally killed the cat. Recently, I installed Asahi Linux on my M1 Pro Macbook &mdash; my mission critical daily carry system without a flipping care in the world. It worked surprisingly well, no problems whatsoever, but I found it to be not as useful as I would have imagined. The problem didn't lie with the engineering or stability of the Asahi Linux project, but rather it lied with the general support for Linux systems on ARM chip, especially for Arch-based distributions. Everything was fine but because of the lack of feature support, 5 hours ago, I decided to nuke the dual boot partition and reclaim the disk space, then reinstall macOS altogether because the OS was running a bit slow and hotter than usual.

Without searching online beforehand, I did a full wipe of whatever partitions there were on the SSD. And that right there was the gateway drug down the rabbit hole of whatever the heck Apple was doing to configure their filesystem and disk management, with the sparkling cameos of useless answers on the Apple discussion forums by wannabe gurus and quantum pseudo tech literate self-acclaimed know-it-alls.

The internal SSD of my MacBook before I solved the shenanigan, caused by blindly nuking the partitions is as followed: - disk0: 500GB &mdash; this is the physical disk total capacity - disk0s1: 500MB &mdash; GUID Partition Table - Free Space: 4xxGB &mdash; the weird-ass void - disk0s2: 2GB &mdash; the recovery partition

Initially, I deleted both the macOS (~400GB) and Linux partitions (~100GB) with the command from the Terminal in Recovery boot:

```bash
diskutil eraseVolume free free disk0s#
```

I came across this erase command from an Asahi Linux stackoverflow post in which the OP also wanted to nuke the disk like myself. However, that was the end of the story on the post without the "what to do after you nuke" instructions. Well, I thought to myself, if there's no sequel to this post, then the subsequent process should be easy enough. Aaaand, I was dead wrong.

The yeet of the SSD partitions leave behind the void which just could not be detected by the MacOS installer nor the graphical tool (diskutil). To make it detectable again, I had to do the most illogical thing which is expanding disk0s1 which was apparently the "GUID Partition Table". It does not make sense because normally this partition just stores the partition table, not the whole usable partition space. But, before I came across this solution, I thought to myself, "what the heck, last resort, last ditch effort before I need to send in the laptop for RMA anyway." Turns out, Apple's ways of performing seemingly regular processes are _built different_, I guess.

A note before I end this blog, I have already tried wiping ALL partitions but they are all locked by kernel (process 0). Heck, I even tried killing the kernel 🤪 process that's using the partitions. In my defense, I was booting from a USB so killing the kernel on the internal SSD is justifiable course of action, to be honest.

So after expanding that GUID partition, the installation can be continued normally without any further hiccup. I think I'll stray away from experimental software for now 😅 as this problem took a huge chunk of my time for troubleshooting...
