---
title:  "Encoding - Run length encoder"
date:   2017-06-13 00:18:00
categories: [encoding-series]
tags: [encoding, run length encoder, compression, data]
---

Today we'll look at a very simple data compression scheme called run length encoding. In fact, you might have already implemented a run length encoder without knowing it!

But let us take a step back. What is data compression and why is it useful? 

Data compression is a way of encoding the raw information in a new format such that the resulting total byte size is smaller. It's useful because often we are dealing with large images, video, or any byte stream really and having a way to compress that information can be very handy. But you might wonder, how do we compress the information so that we don't lose any information? Well, sometimes we do sometimes we don't. The two big types of compression are: lossy and lossless. Generally lossy algorithms have some sort of heuristic which tells them how to discard the least important information. For example, the JPEG format uses a model based on the human visual system to tell it which information is not perceptible by the human eye, and thus can be discarded without any perceptible loss of information.

Now that we understand a bit about data compression, let's got back to the run length encoder. 

Here's how it works.

```cpp
// This is our raw data, uncompressed
"aaaaaaabcdefff"

// The RLE is used to compress identical adjacent characters.
"aaaaaaa" -> "a7"

// So then the whole compressed string would look like this.
"a7b1c1d1e1f3" 
```

Now, pop quiz. Is RLE a lossy or lossless algorithm? 

