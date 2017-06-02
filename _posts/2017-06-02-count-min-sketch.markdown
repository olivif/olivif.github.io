---
title:  "Count min sketch"
date:   2017-06-02 17:59:00
categories: []
tags: []
---

[Last time](/2017/bloom-filter-part-3/) we looked at Bloom filters, which is one type of probabilistic data structure. In this post we will look at another one - [Count Min Sketch](https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch).   

In short, a count min sketch is used to:
* consume a stream of events, where each event has an event type
* query for the frequency of a particular event type in a sketch
* query for the frequency of a particular event type in two different sketches (this will give us the inner product of the frequencies of the event in the two sketches)

It's important to note that due to the risk of collisions and the size of the sketch, it can overestimate the true frequency of the events. It is after all a probabilistic data structure, it doesn't store the raw data, much like the Bloom filter, so this is expected. 

So let's see how the sketch works. 

We will need:
* a 2D array of `rows` x `rows` (`rows` and `cols` should be chosed based on the estimated number of unique event types inserted into the sketch)
* one hash function per row (the hash functions should be independent)

We'll start off with a blank 2D array.

```c++
// rows = 3, cols = 5
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
```

Now let's insert some events.

```c++
insert(event("A"))

// For each row, we'll hash the event type with the
// hashing function for that row to get an index k
// row 0 - 2
// row 1 - 4
// row 2 - 0

// And now we index into every row with the computed k
// and increment by one.
0 0 1 0 0
0 0 0 1 0
1 0 0 0 0
```

