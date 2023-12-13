---
title: "Setting Up a Barebone Dedicated ML Server"
pubDate: "2022-07-23"
tags: ["mlops", "exploratory", "research", "linux", "hardware", "tinkering"]
draft: false
description: "I sure hope that I will make-even with this investment 💸"
images: ["/static/images/ml-3-server.png"]
---

# The Purchase

Back in July 2, after a bi-weekly report on my research progress to the group, I headed to eBay to buy a dedicated GPU for the machine learning tasks that I am performing. The reason, to quell my predictable buyer's remorse, was to have a separate accelerator card from my workstation that runs on my homelab server instead. This card would need to have a (more) massive physical memory than the measly 8GB that my GTX 1080 has and quite a lot cheaper to actually justify the purchase.

After digging around for few hours, I stumbled upon the NVidia Tesla M40 GPU. It is a data-center class GPU based on the **M**axwell architecture.

Here are the specifications:

| Attribute             | Value                        |
| --------------------- | ---------------------------- |
| GPU Architecture      | NVIDIA Maxwell               |
| CUDA Cores            | 3072                         |
| Single-Precision Perf | 7 TFlops w/ NVIDIA GPU Boost |
| Double-Precision Perf | 0.2 TFlops                   |
| GPU Memory            | 24 GB GDDR5                  |
| Memory Bandwidth      | 288 GB/s                     |
| Interface             | PCIe 3.0 x16                 |
| Max Power Consumption | 250 W                        |
| Cooling               | Passive                      |

While it is a 7-years-old GPU, considering the price of `US$179` and three-times the GPU memory of my GTX 1080, I was quite sold on the idea of getting it. The very significant outcome is that I would be able to train on larger batch sizes and perform more aggressive feature engineering tasks.

# The Delivery (rant, skip ahead)

<details>
After 2 weeks of waiting, I was finally notified of a delivery date. So, on that day, I waited. But the delivery was a no-show and it was re-scheduled for the next business day, which was the following Monday. But whoop-dee-doo, on Saturday, an e-mail came in saying that the package was delivered already. With signature. At 11:30 PM. No cap. Thanks, Intelcom.

I smelled an absolute dogshit stench combined with fermented fishiness that it was utter horseshit. First, it came from the fact that I had never provided any signature for any delivery. Second, there was no delivery attempt, no phone calls, no SMS. But I checked the vicinity of the house anyway just to be sure. To no one's surprise, it wasn't there. I checked the tracking on the website and it still said delivered. WTF?

The next morning, I called Intelcom's customer support. It was not easy finding the customer support number either, because there was (and I guarantee still is) nothing listed on the official website. What a fucking shady business that operates on anti-consumerism. Anyway, I waited 20 minutes on a line until I finally got transferred to an agent. The problem seemed to be an incorrect shipping address on the system `?? 🙂 ??`. Whatever I'd just provide again the correct address and it'd be good (right?) and the delivery was still scheduled for Monday. Came Monday, an e-mail came around 4:00 PM saying that the GPU would be delivered from 5:00 PM to 10:00 PM. Said time period came, and I got a call from the delivery person asking for the correct address. What the fuck? Didn't I just correct it on Sunday? Was I sleep-dialing customer support in my dream? Okay fine, I gave the person the correct address and the motherfucker literally had the gall to say that it was too far away (30 minutes) from his location so he didn't want to deliver (????). I'm sorry, but ain't the delivery time between 5 to 10? It was fucking 5:30 PM at that time.

To be abridged and shortened, I dealt with customer support for 2 additional times on the phone, each lasting around 30-40 minutes just to harass them to do the right thing or else I would report their ass to kingdom come with Quebec Consumer Protection Office and drag their faces through the mud on Better Business Bureau. And it motherfucking worked. I finally got the GPU on Thursday.

</details>

# The Installation

After installing the card in my server, I realized that the PSU didn't have enough power (450 W) to run the whole system with the M40 GPU. So, I ran to the nearest Canada Computers and picked up a 650 W PSU. I had to saw off the second CPU power connector clip in order to fit the card's power slot. And... It still didn't work.

Perusing the great interweb for an hour or so, I came across a YouTube video that said I would need to enable something-something more than 4-GB decoding(?) in BIOS for it to work. The main problem was I had been running the server headlessly. That is, only through SSH and no user I/O whatsoever.

To solve this, I devised 2 options:

1. Buy a CPU with iGPU (my current one doesn't have one)
2. Buy a cheap-ass GPU

For option, the most sensible thing was to get a Ryzen 3200G (I am running on an AMD motherboard). But it costs around 300 dollary-doos. On the other hand, a cheap-ass GPU would only cost me 99 Canadian rupees in total, so I went for the latter and bought a Radeon card off Amazon.

Card arrived. BIOS configured. System booted to OS. And working fine.

# The NVIDIA Installation

The card would totally not work if there ain't any drivers, especially for machine learning that utilizes those sweet CUDA cores.

I first disabled the default Nouveau driver:

```sh
sudo su
touch /etc/modprobe.d/blacklist-nouveau.conf
echo -e "blacklist nouveau\noptions nouveau modeset=0" >> /etc/modprobe.d/blacklist-nouveau.conf
update-initramfs -u
reboot
```

Then, I installed the CUDA Toolkit using the Runfile method for easy clap:

```sh
wget https://developer.download.nvidia.com/compute/cuda/11.7.0/local_installers/cuda_11.7.0_515.43.04_linux.run
sudo sh cuda_11.7.0_515.43.04_linux.run
```

Then, I installed `anaconda` (for demo only, please refer to Anaconda official website for latest downloads):

```sh
wget https://repo.anaconda.com/archive/Anaconda3-2022.05-Linux-x86_64.sh && bash Anaconda3-2022.05-Linux-x86_64.sh
```

After that, I created a new environment, installed Jupyter Notebook and dependencies. And finally, I ran the first ever training (pictured below). I made sure to monitor the GPU usage through `nvidia-smi` to verify if it was utilizing the GPU, not the CPU.

<img src="/static/images/ml-3-server.png"></img>

# Afterwords

Looking at the whole process, I spent around `CA$350` in total for the GPU + compatible components + other efforts. Comparing that one-time price tag (electricity excluded) to Google Colab (`CA$15` a month if I remember correctly), I should be able to breakeven in 2 years. However, it should be taken into considerations that Google Colab has timeouts and the GPU instance provided is not guaranteed, so on a good day, you might get A100 or V100, but on a bad day, you would get the whimpy K80. Adding more to the variance, you are also dependent on the storage space of your Google Drive to store models and data, which adds 5 - 15 dollars a month for a usable amount of storage. Thus, bringing down the breakeven period to simply less than 1 year of continuous usage.

In the near future, I would want to experiment with distributed machine learning setup between the server and my workstation to see if it has any larger potential with performance gain.

Subjectively, I think the effort was worthwhile. Though, it would have been way better if it was not for Intelcom. I'm calling that shitty company out. Keep that in your mind: Intelcom is bad.
