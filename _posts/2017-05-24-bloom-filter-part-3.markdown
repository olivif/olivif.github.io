---
title:  "Implementing a Bloom filter - Part 3"
date:   2017-05-24 19:00:00
categories: [bloom-filter]
tags: [bloom filter, bloom, cpp, c++]
---

Last time we looked at how the internals of Bloom filters work. In this post, we'll get our hands dirty and implement it. 

We'll set up an interface with pure virtuals. 

```c++
class IBloomFilter 
{
public:
    virtual void put(std::string input) = 0;
    virtual bool isMaybePresent(std::string input) const = 0;
};
```

Now we'll need to pick something to use as our array of bits. The two obvious choices are [`std::bitset`](http://www.cplusplus.com/reference/bitset/bitset/) and [`std::vector<bool>`](http://www.cplusplus.com/reference/vector/vector-bool/). Since we want the user of the Bloom filter to specify its size at construction time, we will need to go with the vector. 

Here is our class definition. 

```c++
class BloomFilter : public IBloomFilter {

public:
    BloomFilter(const Hash& hash, int size, int k);

    // Inherited via IBloomFilter
    virtual void put(std::string input) override;
    virtual bool isMaybePresent(std::string input) const override;

private:
    Hash m_hash;
    int m_k;
    std::vector<bool> m_vector;
};
```

Now, you might be asking how we will pick `k` hashing functions. What we actually need is `k` functions which will somehow hash the input, give us `k` different indexes into our bit vector and ensure that these results are consistent. We will simply pick a `SHA256` hashing functions and hash `k` times to get `k` different strings, then convert those to ints and mod by our length. 

We will use [picosha2](https://github.com/okdshin/PicoSHA2/blob/master/picosha2.h) for doing the hashing.

```c++
std::string Hash::hash(const std::string & input) const
{
    // generate the hex hash of the input
    std::string hashedInput;
    picosha2::hash256_hex_string(input, hashedInput);

    return hashedInput;
}
```

Now that we have a way of generating a hash, we will hash `k` times and convert each hash to an int. For simplicity we'll exclude the implementation here but you can see the full code at [Hash.cpp](https://github.com/olivif/bloom-filter/blob/master/BloomFilter/Hash.cpp).

```c++
std::vector<unsigned int> Hash::hash(const std::string& input, unsigned int iterations, unsigned int max) const
{
    // generate k hashes
    // convert each hash to an int 
    // mod each int by max
}
```

Now that we have all the moving parts, we can easily implement `put` and `isMaybePresent`.

```c++
void BloomFilter::put(std::string input)
{
    // Hash and get k indexes
    auto& indexes = m_hash.hash(input, m_k, m_vector.size());

    // Set all those bits to 1
    for (const auto& index : indexes)
    {
        m_vector[index] = true;
    }
}

bool BloomFilter::isMaybePresent(std::string input) const
{
    // Hash and get k indexes
    auto& indexes = m_hash.hash(input, m_k, m_vector.size());

	// Find if all bits are set
    for (const auto& index : indexes)
    {
        if (m_vector[index] == false)
        {
            return false;
        }
    }

	return true;
}
```

And this is pretty much it. You can see the full code at [olivif/bloom-filter](https://github.com/olivif/bloom-filter/tree/master/BloomFilter). Next up we'll do some experiments with `n` and `k` and see what our error rates are.