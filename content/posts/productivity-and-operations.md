---
title: 'First Code Competition'
date: '2022-02-24T19:00:00'
tags: ['competitive', 'programming']
draft: false
summary: ''
---

> This post is going to be written in the style of an incident postmortem. `:^)`

## Overview

Those who are in the dev scene probably know, to some extents, what competitive programming is. It is basically Leet Code on the highest purity crack. Each problem presented to the participants during the competition can said to be comprised of multiple Leet Code problems in the topics of algorithm, data structure, optimization, dynamic programming, so on and so forth.

Today, it was my first time participating in such a competition, virtually. It was Hash Code and organized by Google. I am proud to say that our team of three did not complete the challenge. But it was never about the end result, it always has been the friends we made along the way `:^)`.

]The qualifier round is truly fitting of being a Google competition. Details of which can be read here [https://codingcompetitions.withgoogle.com/hashcode](https://codingcompetitions.withgoogle.com/hashcode). Not gonna lie, it was _really_ hard. The competition presents a multi-faceted problem with a lot of aspects the solvers need to account for. And according to the Google engineer who organizes this year's HashCode in the post-round livestream, there is yet to be an optimal solution.

## Timeline

Back to our team's performance during the qualifier round. Here is our timeline of the event with our progress. Note that all the timestamps are documented on **2022-02-24** and according to the **EST** timezone.

- `11:45AM` I reserved a conference room for our physical collab space.
- `12:00PM` Initial equipment and room setup completed.
- `12:30PM` Hash Code 2022 Qualifier round started and I started problem comprehension while waiting for the rest of the team to arrive.
- `12:45PM` The team was assembled and we debriefed the problem statement.
- `01:30PM` Whiteboarded the data structure and started implementing while figuring out the problem goal.
- `02:00PM` Partially completed input parsing code. Tested against example input and realized we overshot the line traversal.
- `02:30PM` Completed input parsing code. Tested against all input sizes and types. Test completed without errors.
- `02:45PM` Analyzing aspects of the problem: selecting important features, extracting and interpolating metrics, and building decision tree system.
- `03:30PM` Analysis still in progress but a rough idea of how we should tackle the scheduling and optimizing was realized.
- `03:45PM` Competition ended. We stayed for a bit to further explore edge cases and watched the post-round livestream to understand more of the real-life aspects and metadata of the problem.

## Action Items

| #   | Action Item                          | Type     | Status      |
| --- | ------------------------------------ | -------- | ----------- |
| 1   | Problem comprehension                | Holistic | Partial     |
| 2   | Data Structure: OOP                  | Input    | Done        |
| 3   | Data Parsing                         | Input    | Done        |
| 4   | Optimize selection                   | Logic    | Partial     |
| 5   | Optimize project order               | Logic    | Partial     |
| 6   | Incorporate skills into optimization | Logic    | Not started |

## Analysis

### Expectations

Upon reading the problem and estimating the complexity, we expected to at least be able to run the first example and output the first output correctly.

### Result

We was not able to meet the expectations. But we managed to develop our ideas for tackling and optimizing the problem. Our tangible result was the developed data structure and input parsing logic.

### My performance

The majority of the analysis will be on my own performance as I cannot speak for others.

I am the weakest link in the team due to my lesser experience in the Leet Code scene and the competitive programming scene as compared to the other team members. My input to the comprehension progress needs further polishing in terminologies and presentation, as well as the speed at which I can deconstruct and organize various aspects of the coding challenge. The main contribution I made weighed in in terms of writing code and implementing the ideas we had developed so far at the time. Although, on that note, I would still need to improve my coding effiency and debugging skills.

### What I learned and remediations going forward

Experience would really come in handy. This is explicitly apparent when I see the winners' names are mostly from past competitions. I would need to solve more algorithmic problems to train myself to be come better at that way of thinking. Along with that process, I would also be able to improve my programming efficiency.
