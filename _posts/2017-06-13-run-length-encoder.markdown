---
title:  "Encoding - Run length encoder"
date:   2017-06-12 00:18:00
categories: [encoding-series]
tags: [encoding, run length encoder, compression, data]
---

Today we'll look at a very simple data compression scheme called run length encoding. In fact, you might have already implemented a run length encoder without knowing it!

But let us take a step back. What is data compression and why is it useful? 

Data compression is a way of encoding the raw information in a new format such that the resulting total byte size is smaller. It's useful because often we are dealing with large images, videos, or any byte stream really and having a way to compress that information can be very handy. 

But you might wonder, how do we compress the information so that we don't lose any information? Well, sometimes we do sometimes we don't. The two big types of compression are: **lossy** and **lossless**. Generally lossy algorithms have some sort of heuristic which tells them how to discard the least important information. For example, the JPEG format uses a model based on the human visual system to tell it which information is not perceptible by the human eye, and thus can be discarded without any perceptible loss of information. Lossless ones usually use cool tricks to store the data in a different format which minimizes duplication.

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

So what we do is quite neat, instead of repeating ourselves, we just pack the adjacent identical characters. 

The code is pretty straight-forward.

```cpp
std::string RunLengthEncoder::Encode(const std::string& data) const
{
    // For every character, check if it's part of a sequence.
    // If it is, collapse it and encode into {char}{sequencelength}
    std::stringstream stream;
    size_t current = 0;
    size_t length = data.length();

    while (current < (length - 1))
    {
        // Loop while we have the same character
        size_t sequenceLength = 1;
        while (current < length - 1 && data[current] == data[current + 1])
        {
            ++sequenceLength;
            ++current;
        }

        // Add to the encoded string
        stream << data[current] << sequenceLength;

        ++current;
    }

    return stream.str();
}
```

Now, pop quiz. Is RLE a lossy or lossless algorithm? Only counts if you do it without google.

Next up, we'll look at a slightly more sophisticated encoding algorithm, though not by much.