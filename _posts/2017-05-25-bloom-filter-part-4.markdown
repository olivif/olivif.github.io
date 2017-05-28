---
title:  "Implementing a Bloom filter - Part 4"
date:   2017-05-25 19:00:00
categories: [bloom-filter]
tags: [bloom filter, bloom, cpp, c++]
---

[Last time](/2017/bloom-filter-part-3/) we actually implemented our [Bloom Filter](https://github.com/olivif/bloom-filter). Now we will run some experiments to see how well our Bloom filter performs. 

Let's figure out what our false positive rate is depending on k. This should help us pick the optimal k. 



