---
title:  "Implementing a DHT in C# - Part 2"
date:   2017-05-21 8:17:00
categories: [project-dht]
tags: [project-dht, c#, csharp, dht, distributed hash table]
---

Last time we gave an overview of DHTs, and how our DHT will work conceptually. In this post we will implement our node class and our storage class.

`NodeInfo` is responsible for holding information about the node, like how other nodes can reach it (hostname + port) along with its unique identifier. We are picking a `UInt32` length node id, we will discuss the reasons behind this choice more when we get to the routing. 

```csharp
    /// <summary>
    /// Stores info about a node in the DHT network
    /// </summary>
    public class NodeInfo
    {
        /// <summary>
        /// 32 bit node id
        /// </summary>
        /// <remarks>
        /// Being explicit about the 32 bit declaration
        /// since it's crucial to how routing will work between DHT nodes.
        /// </remarks>
        public UInt32 NodeId { get; set; }

        /// <summary>
        /// Host name (or IP)
        /// </summary>
        public string HostName { get; set; }

        /// <summary>
        /// Port running on
        /// </summary>
        public int Port { get; set; }
    }
```

So now we have a `NodeInfo` class which will allow us to uniquely identify and contact a node. 

The next step is, how do we actually store data? 

We'll start with defining the interface for the storage component. 

```csharp
    /// <summary>
    /// Interface for node storage
    /// </summary>
    public interface INodeStore
    {
        /// <summary>
        /// Does this store contain this key
        /// </summary>
        bool ContainsKey(string key);

        /// <summary>
        /// Gets a value (if there). Null if not.
        /// </summary>
        string GetValue(string key);

        /// <summary>
        /// Adds a key, value
        /// </summary>
        bool AddValue(string key, string value);

        /// <summary>
        /// Removes a key, value
        /// </summary>
        bool RemoveValue(string key);
    }
```

And for simplicity we will define an in-memory implementation of this class. The [code](https://github.com/olivif/dht-csharp/blob/master/DHT/Nodes/NodeStore.cs) is pretty straight-forward, using a [ConcurrentDictionary](https://msdn.microsoft.com/en-us/library/dd287191(v=vs.110).aspx).

Next, we will look at routing and how we will distribute data across the nodes.


---------
You can see the whole series by following the [project-dht](../../categories/#project-dht) category. 