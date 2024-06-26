---
title: 'Building Towards a Taxonomy of MLaaS'
pubDate: '2022-07-04'
tags: ['mlaas', 'mlops', 'exploratory', 'sca', 'soa', 'research']
draft: false
description: 'There is a scarcity in terms of papers 😣 so I have to get creative 💡'
---

> ⚠ Under Construction. Please check back later or help yourself with my previous publications 🤗.

> This post is adapted on my internal report #3, as part of my research group efforts in studying and developing machine learning processes, frameworks, and knowledge base. In addition to the adaptation of the report, I add further context for general viewership comprehension.

## The Building Blocks (or Components)

### Service-Oriented Architecture

### Service Component Architecture

- According to the [OASIS Open Composite Services Architecture](http://www.oasis-opencsa.org), SCA comprises 3 attributes(?)/specifications(?):
  - Components
  - Composites
  - Services

The components implement its business function; the composites assemble multiple compnents together to create business solutions; and the services create an interface for the user with the component and composite functions.

So, we can apply such concept to reach an understanding that any MLaaS is built upon many functional components, be them data-related or training task-related. The user can pick and choose any or all the functional components to achieve their goals via a unified interface, e.g. a web console.

Building further on this concept, providers can target different market segments and technical levels while also easily maintain the contractual service level agreements (SLA) and define key service level objectives (SLO). This homing-in is achieved through the modularity and scalability of the service product.

### Attributes of a MLaaS

Machine Learning as a Service (MLaaS) from a high level perspective is very much similar to Platform as a Service (PaaS). It is evident by the following observabile-at-a-glance features:

- Is a cloud-based service
- Accessible through web-based (RESTful) UI or API calls from a CLI tool
- Scalable based on the workload
  - Compute resources
  - Database size
- Data security, privacy provisions
- High availability and fault tolerant
- Automation-friendly, which is crucial for MLOps
- Offering flexible pricing models

Now that we lay the foundation for MLaaS roughly can be. One might pose the question, well then, how do we differentiate MLaaS from other types of services? We might want to consider viewing it as being encapsulated by the PaaS and offering more specialized tools and functions that non-ML platforms. Or MLaaS is at the same layer/level of a PaaS and the sole job of MLaaS is its namesakes. Maybe we can consider the types of models that a service provide or the availability of an ML model itself.

## Putting the Blocks Together

<img src="/blog-content/ml-2-taxonomy-1.png"></img>

Something something

## In Reality (Tesla)

## Going Back to Our Research Interests

## References

- [Service Component Architecture (SCA). Edwards, Oasis-OpenCSA.org](http://www.oasis-opencsa.org/sca)
- [MLModelCI: An Automatic Cloud Platform for Efficient MLaaS. Zhang et al.](https://drive.google.com/open?id=1SGRBGFTs7QGNBfOI59L3PovjtqN7RuNK&authuser=iam%40hoanganh.tech&usp=drive_fs)
- [MLaaS: Machine Learning as a Service. Ribeiro et al.](https://drive.google.com/open?id=10KdimmnGQtjReA8bKaUmzBKeJ1icczN0&authuser=iam%40hoanganh.tech&usp=drive_fs)
- [Patent “Data Pipeline and Deep Learning System for Autonomous Driving”. Uvarov, Tesla Inc.](https://drive.google.com/open?id=1-qRhjVQisle7tfRoZIiqVtffloUO5Air&authuser=iam%40hoanganh.tech&usp=drive_fs)
- [Andrej Karpathy presentation at Tesla Autonomy Day, Tesla on YouTube.](https://www.youtube.com/watch?v=Ucp0TTmvqOE&t=7760s&ab_channel=Tesla)
- [Andrey Karpathy presentation at PyTorch at Tesla, PyTorch on YouTube.](https://www.youtube.com/watch?v=oBklltKXtDE&t=507s&ab_channel=PyTorch)
