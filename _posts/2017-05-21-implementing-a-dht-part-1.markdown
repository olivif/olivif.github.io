---
title:  "Implementing a DHT in C# - Part 1"
date:   2017-05-21 8:59:00
categories: [project-dht]
tags: [project-dht, c#, csharp, dht, distributed hash table]
---

A popular concept in distributed systems is the one of a [Distributed Hash Table (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table) which provides a way of efficiently storing and retrieving data in a system of distributed nodes. There are many applications of DHTs, they are used in web caching, DNS, distributed file systems, peer to peer file sharing, CDNs, instant messaging and many others. 

In this series we will implement a DHT from scratch in C# and we will use the [Kademlia specification](http://xlattice.sourceforge.net/components/protocol/kademlia/specs.html) as a rough guide. 

We will build a system of nodes where:
* every node has a unique identifier (NodeId)
* every node has a list of other nodes (Nodes)
* every node can store a key and a value 
* every node is responsible for storing data for a particular range of keys

Let’s take an example to see what our DHT should be able to do at the end of the series — note that the final partitioning scheme might be different, this example will serve as a way of us visualizing the end result before jumping to the implementation. 

Nodes - diving the alphabet into 4 chunks, we give each node responsibility for one chunk of the data.

```
Node1 -> A-E
Node2 -> F-L
Node3 -> M-S
Node4 -> T-Z
```

Storing data
Initially, every node has no data stored.
```
Node1 -> A-E : []
Node2 -> F-L : []
Node3 -> M-S : []
Node4 -> T-Z : []
```

We can execute store operations to store data.
```
store("The quick brown fox")
Node1 -> A-E : []
Node2 -> F-L : []
Node3 -> M-S : []
Node4 -> T-Z : [ "T" -> "The quick brown fox" ]

store("Hello world")
Node1 -> A-E : []
Node2 -> F-L : [ "H" -> "Hello world" ]
Node3 -> M-S : []
Node4 -> T-Z : [ "T" -> "The quick brown fox" ]

store("What does the fox say")
Node1 -> A-E : []
Node2 -> F-L : [ "H" -> "Hello world" ]
Node3 -> M-S : []
Node4 -> T-Z : [ "T" -> "The quick brown fox", 
                 "W" -> "What does the fox say" ]
```

And we can execute find_value operations to retrieve data stored.

```
find_value("A")
[]

find_value("T")
["The quick brown fox"]

find_value("H")
["Hello world"]
```

We’ve now laid out the concepts, we will start implementing the `NodeId` functions in Part 2.

---------
You can see the whole series by following the [project-dht](../../categories/#project-dht) category. 