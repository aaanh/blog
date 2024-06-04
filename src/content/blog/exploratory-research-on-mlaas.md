---
title: 'Initiate Exploratory Research on ML/DL/AIaaS'
pubDate: '2022-06-30'
tags: ['mlaas', 'mlops', 'exploratory', 'research']
draft: false
description: 'There are so many of them out there 😱'
---

> This post is adapted on my internal report #1 and #2, as part of my research group efforts in studying and developing machine learning processes, frameworks, and knowledge base. In addition to the adaptation of the report, I add further context for general viewership comprehension.

## Background

Starting around end of May, I picked up a project pitch from my research professor. This "mini" project originally entailed benchmarking or finding a way to benchmark Machine-Learning-as-a-Service platforms. Some examples of these platforms were given: [SageMaker](https://aws.amazon.com/sagemaker/) by Amazon [Vertex AI](https://cloud.google.com/vertex-ai) by Google, [AzureML](https://azure.microsoft.com/en-us/services/machine-learning/) by Microsoft, [Watson](https://www.ibm.com/cloud/watson-studio) by IBM. With those examples in mind, I began to survey the Platform-as-a-Service scenery in search for similar services.

## Expected Outcomes

We cannot really kick-start the research process without a certain goal in mind. Even though such goal might be vague, it still allows us to form a direction and enumerate the areas we want to look into.

For this project, my immediate goal is to gather as much information about these platforms as possible and form a report. My report would include the observed characteristics of the surveyed platforms and build a comprehensive comparison system between the platforms on the features that they offer.

I soon realize that this is not a small project as it now turns out to be. But the initial project startup did provoke lots of discussions and thoughts into the premise of cloud-based machine learning processes.

## Tasks

Based on the expected outcomes, I devised the following tasks to better anchor my evaluation process and to provide a better idea on what data to gather.

- Shortlist the platforms to assess
  - Taxonomy of platforms providing AI/ML services
  - Categorize all existing platforms
  - Analyze CI/CD pipelines offered
- Analyze existing scientific literatures (attached in References)
- Choose datasets and models for benchmark
- Evaluate UX from data ingress, model training, inference, and interpret results
- (If possible) Automate model training for statistical iterations

But before getting to those tasks, we will need to understand some concepts first...

## Machine Learning Operations (MLOps)

### State of the Union

MLOps recently massively exploded in popularity. It is not exactly something new for the industry professionals (this is my own claim); however, for the general populace, the term experiences a huge buzz. My conjection is that the process described in MLOps literatures has always been extensively used and constantly improved by the engineers working on such project. Only now, that it is being recognized with a de facto name brings much attention. With such attention, academia and newbies in the field are pouring increased effort in researching and further pushing the boundaries of MLOps.

### What is MLOps?

#### MORE background

What is it exactly? To explain this, we need to go back to the basic building blocks of machine learning (ML).

In layman's terms, ML involves developing a prediction system that makes use of historical data. From a high-level standpoint, this prediction system relies on cleverly designed algorithms to take in the input data and spew out result. This result can either be some raw values that need to be aggregated first or direct predictive values that are readily actionable.

$known\_ data \rightarrow ML\ system \rightarrow predictive\_ data $

These algorithms perform pattern recognition. For example, in the case of a linearly distributed 2D dataset, the algorithm that fits the curve is linear regression (like this image with random values below).

<img src="/blog-content/ml-1-linear-regression.png"></img>

#### Machine Learning Operations

Ok, imagine DevOps, but in the context of machine learning.

On a more serious note, MLOps is more or less relying on the same principles and processes of DevOps. The lifecycle of one or many ML models from raw data to training to deployment for production use is broken down into more tangible steps and tasks to act as a banner of guidance for an engineering team when they want to put ML into real-world applications and services.

While it is a thought-provoking discipline, MLOps needs [a whole book](https://www.goodreads.com/book/show/60715378-designing-machine-learning-systems?utm_medium=api&utm_source=author_widget) (maybe even several) to properly be explained, by industry professionals (like through [a course](https://www.coursera.org/learn/introduction-to-machine-learning-in-production)), not by an apprentice on a blog post 😜.

> **What does this MLOps have to do with MLaaS?** > &mdash; Well, I'm glad you ask.

MLaaS providers heavily employ the concept of MLOps in order to build up their machine learning service on the cloud platform. We'll get into this another blog post to be concise.

## Research Questions

1. Based on what features and metrics do we measure a platform?
   1. And which features must be excluded? And why?
   1. What features are must-have?
   1. Is it necessary to apply weights for features? And How?
1. How can we formulate a scoring system for these features?
1. How the requirements from the datasets can be met?
1. How can such scoring system communicates pros and cons for the audience of this research project?
1. How can we ensure our assessments and benchmarks themselves free from bias?

## Expected Contribution to the field

- To form a numerical evaluation framework to evaluate MLaaS platforms
- To better understand how different MLaaS platforms best fit an ML workflow and tasks
- To assess MLaaS platforms adaptability to different workloads
- To evaluate usability, learning curve, explanability, and interpretability of model training process

## Existing MLaaS Providers/Platforms

My survey into MLaaS platforms yielded a non-exhaustive list of providers as detailed in the proceeding table. It is to be noted that the table does not contain **ALL** of existing providers. The enumeration of currently available ones is a never-ending task as every now and then a new platform is created.

|                             |                 |                   |                 |
| --------------------------- | --------------- | ----------------- | --------------- |
| EC2 (AWS)                   | WhyLabs.ai      | Obviously         | Vertex AI (GCP) |
| Compute Engine (GCP)        | Hasty.ai        | Skyl.ai           | Azure ML        |
| Virtual Machines (Azure)    | Pega.ai         | MLJAr             | SageMaker (AWS) |
| Linode                      | Jasper.ai       | Teachable Machine | Baidu ML        |
| DigitalOcean                | DataRobot.com   | Lobe              | IBM Watson      |
| Virtual Servers (IBM)       | Clarifai.com    | RunwayML          |                 |
| Cloud Compute (Baidu)       | MonkeyLearn.com | Lityx             |                 |
| Compute Services (Oracle)   | Akkio.com       | Idiomatic         |                 |
| Elastic Computing (Alibaba) | Levity          | Reveal            |                 |

In my own reasoning, the list includes compute engine and virtual private server providers because, technically, you can build a fully managed and customized MLaaS-like platform using such infrastructure. But, after lengthy discussing with the research group, I have abandoned such idea because we want to narrow down the evaluation scope.

## Observations

- Commonalities:
  - Code workspace integration (similar to Google Colab)
  - Data storage
  - Model caching and saving
  - In the end, price is scaled with the flux of data and/or runtime
  - Offer CI/CD pipelines
- Differences:
  - Pricing
  - UI/UX
  - Complimentary service variety

### Pricing Models

- Pricing models for each platform are very dynamic and specific to the ML task. Here are 3 examples:
  - Vertex AI (GCP) divides into 4 categories: image data, video data, tabular data, text data. Then each category is divided into specific ops, e.g. training, deployment, batch prediction.
  - Azure ML (Microsoft) pricing is based on the type of compute nodes, plus other infrastructural services, e.g. data warehouse, analytical insights, = container registry, etc.
  - AWS SageMaker (Amazon) similar to Azure ML which bases its costs on infrastructure (or instances) usage.

## Conclusion

After lengthy discussion with the group and the professor, we have realized that the current approach would be too broad to lead to tangible and meaningful results. In order to continue, I would need to go back to the drawing board, find published and peer-reviewed literatures in the domain. Completing this should give me and the group a better idea of what is missing in the field of MLaaS.

With that, we shall further discuss papers in my next post and go through some practical examples of MLOps and MLaaS implementations.
