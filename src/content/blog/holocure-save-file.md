---
title: 'Holocure Save File Restore'
pubDate: '2022-07-03T04:30:00'
tags: ['game', 'hacking', 'holocure']
draft: false
description: 'Had insomnia last night so I stayed up until dawn playing Holocure'
image: '/blog-content/tech-holocure-save-file.png'
---

<img src="/blog-content/tech-holocure-save-file.png"></img>

# Background

[Holocure](https://kay-yu.itch.io/holocure) is a fan-made content by the animator [Kay Yu](https://twitter.com/kaynimatic) in the form of a survival, roguelike, shoot &apos;em up game. The gameplay mechanics are similar to those of the game [Vampire Survivors](https://store.steampowered.com/app/1794680/Vampire_Survivors/). The game content features [Hololive](https://hololive.hololivepro.com/) characters, who are Virtual YouTubers (vtubers), along with their references and signature items.

The game target platform is `win32`.

# Problem Statements

- You want to continue your Holocure progress on another Windows machine.
- You have a backed up save file `save.dat`.
- You can only download the latest version of Holocure.
  - You don't have access to the version of assemblies that generated the `save.dat`.
- You don't trust scripts and tools on the Interweb, preferring to do it manually.
  - You are somewhat competent at more technical computing concepts &amp; operations.

# Methodology

## Restore Steps

**On your brand spanking new machine**

- Generate the initial save folder
  1. Download the game from official release channel [https://kay-yu.itch.io/holocure](https://kay-yu.itch.io/holocure).
  1. Launch the game for the first time.
  1. Get to the game main menu.
  1. Exit it.
- Get content of new `save.dat` file. All steps in this section are performed on the new save directory that the game generates by default.
  1. <kbd>Win</kbd> + <kbd>R</kbd>{' '}
  1. Paste this path in and hit <kbd>Enter</kbd>:
     ```
     %USERPROFILE%\AppData\Local\Holocure
     ```
  1. ⚠ Make a backup immediately ⚠
     - Right-click `save.dat` > Copy > <kbd>CTRL</kbd> + <kbd>V</kbd>
     - Name the copy `save.dat.bak` or something
  1. Open `save.dat` file there with a text editor
     - save.dat: ASCII text, with very long lines (1560), with no line terminators
     - The file is encoded in base64
  1. Copy all the content and paste it into [a decoder like base64](https://www.base64decode.org/)
     - Or use `base64` CLI in WSL `base64 -d save.dat >> save.decoded.`
  1. Sample decoded file:
     - <img src="/blog-content/tech-holocure-example.png"></img>
  1. You are probably seeing a string like this:
     ```json
     y4ݴouy{F{sm}^svi8s6}{Vk{ "food": 1.0, "specUnlock": 1.0, "haste": 2.0, "holoCoins": -136.0, "unlockedItems": [ "BodyPillow", "FullMeal", "PikiPikiPiman", "SuccubusHorn", "Headphones", "UberSheep"........
     ```
  1. Look for `randomMoneyKey` attribute and write down its the numeric value
     - Example: `"randomMoneyKey": 420.0`
     - This is a randomly generated "key" that acts as an anti-cheat for the money you have.
  1. Pay attention to the first non-sensical word in double quotes you can see
     - In this case, `"food"`
  1. Trace backwards to the closest open curly bracket `{`
  1. Copy the portion from and including that bracket till the end and including the weird box character.
  1. Paste into [the tool](https://www.base64encode.org/)
  1. Re-encode the string segment into base64
     - You get something like `eyAiZm9vZCI6........`
     - This gives you the starting point of the actual saved progress of the game.
  1. So, back in the `save.dat`, find where the segment you got from the previous step is and yeet that.
  1. Save the modified `save.dat` file.
  1. This step concludes the preparation of the local save directory.
- Prepping the backed up `save.dat` file containing your progress
  1. Download or transfer the file to your new machine.
  1. For concision, this guide assumes you paste the `save.dat` file on your `%USERPROFILE%\Desktop`
  1. Open the file with a text editor
  1. Decode it
  1. Look for the `randomMoneyKey` attribute
  1. Change its value to the number you got from the default file at `%USERPROFILE%\AppData\Local\Holocure\save.dat`
     - In this case, `420.0`
  1. With that value change, like the logic you did with the default file
     - Find the first non-sensical word in that string
     - Trace backwards to the closest open curly bracket `{`
     - Copy the portion from and including that bracket till the end and including the weird box character.
  1. Paste the copied string to [the encoder](https://base64encode.org)
  1. Re-encode it.
  1. Copy the re-encoded string.
- Back to the directory `%USERPROFILE%\AppData\Local\Holocure\`
  1. Open the `save.dat` file if you have not already.
  1. Paste (append) the copied string right after whatever is there, make sure there's no whitespace <kbd>Space</kbd>.
  1. Save it.
- Re-open HoloCure
- Et voila, it is back.

## Backup Strategies

### Cloud Sync

- I use Google Drive to automatically back up that specific folder
  ```
  %USERPROFILE%\AppData\Local\Holocure
  ```
  Since I have Google Drive desktop installed already on all my computers.
- But, to be noted that you would only need the `save.dat` file to properly restore your progress.

### Shadow Copy

- You can make a shadow copy of the folder.
- Won't go into details, there are guides out there on the internet.
- Copy that blob to your new machine.

### Practice 3-2-1

High resilient data recovery strategy in the event of any type of disaster, except Earth's complete destruction.

- 3 daily backups.
- 2 on-site (different machine/server, on a NAS, on a cold storage medium like tape, on a USB key).
- 1 off-site (preferably different region).

# Backstory

Because I wanted to continue my Holocure progress on my laptop while lying on my bed, I needed to transfer the progress from my desktop tower. That's it, lol 😂.

# Contact, assistance request, bug report

ℹ Please submit an issue at [https://github.com/aaanh/ml/issues](https://github.com/aaanh/ml/issues).
