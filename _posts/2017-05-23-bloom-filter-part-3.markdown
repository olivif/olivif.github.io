---
title:  "Implementing a Bloom filter - Part 3"
date:   2017-05-23 21:00:00
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
typedef void(*hashingFunction)(std::string a);

class BloomFilter : public IBloomFilter {

public:
	BloomFilter(int size, std::vector<hashingFunction>&);

	// Inherited via IBloomFilter
	virtual void put(std::string input) override;
	virtual bool isMaybePresent(std::string input) const override;

private:
	std::vector<hashingFunction> m_hashingFunctions;
	std::vector<bool> m_vector;
};
```