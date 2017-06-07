---
title:  "Understanding arrays"
date:   2017-06-07 20:04:00
categories: [data structures basics]
tags: [array, javascript, js, beginner, programming]
---

This is the first post of a small beginner series on data structures. 

In this post we will focus on [arrays](https://en.wikipedia.org/wiki/Array_data_structure), we'll understand how an array works, what you can do with it and why it's useful. 

So what is an array? Simply put, an array is a contiguous chunk of memory which stores a collection of elements. These elements could be numbers, strings or even objects. Let's create some arrays. We'll use javascript for all the code examples.

```javascript
// Here is an array of numbers
var numbers = [5, 10, 1, 7];

// And an array of strings 
var animals = ["dog", "cat", "octopus", "bear", "turtle"];

// And an array of objects (people objects in this case)
var people = 
[ 
    {
        name: "Bob",
        age: 20
    },
    {
        name: "Sue",
        age: 21
    }
];
```


Now, what can we do with an array? The most basic operations are:
* getting the length of the array
* getting an element at a specific index in the array
* iterating through the array

Let's run some examples to see how this works. 

All we have to do to get the length of these elements is call `.length` in JavaScript.

```javascript
console.log(numbers.length);
console.log(animals.length);
console.log(people.length);

// This will print
4 // because we have 4 numbers
5 // 5 animal strings
2 // 2 people objects
```

Now, how can we get some specific elements in the array?

```javascript
// An index is just a number which defines the position of the element
// we are looking for. Array indexing starts at 0, so we can use that
// to get the first element. We'll use our animals array for this.
var firstAnimal = animals[0];
// firstAnimal is "dog"

// Now let's get the last animal
// Note that the length of our animals array is 5 (because we have 
// 5 animals). However, because we start indexing at 0, in order 
// to get the last element we need to index by length - 1, in this case 4. 
var lastAnimal = animals[4];
// lastAnimal is "turtle"

// What happens if we try to index by a number larger than length - 1?
var someAnimal = animals[100];
// someAnimal = undefined
// The reason we get undefined is because there simply is no element 
// at index 100, remember we only have 5 animals. In JavaScript 
// we get undefined, in some other languages this might throw 
// an out of bounds exception. 
```

And finally, how can we iterate through the array? What does iterating mean? It means we will visit each element of the array linearly - from the first element all the way to the last one. 

We can do this in two ways, in JavaScript and in other languages as well. We can use a raw for loop and index into the array or we can use iterators. Let's say we want to go through the list of people we have an print every person's name. 

Let's do this with a basic for loop first.

```javascript
// We run the loop from 0 to length - 1 (because we use < length),
// we index into the array to get every element and then we print
// off the name.
for (var i = 0; i < people.length; i++) {
    var person = people[i];
    console.log(person.name);
}

// This will print
Bob
Sue
```

Now let's do it with an iterator loop.

```javascript
// We call .forEach on our array of people
people.forEach(function(person, index) {
    console.log(person.name);
}); 

// This will print
Bob
Sue
```

Now why would we pick one over the other? Well, under the hood `forEach` does the same thing as our raw `for`, so we get correct results either way. The difference is in readibility because the `forEach` syntax is a lot easier to understand and also we don't need to worry about making mistakes with the indexes (such as starting at 1 instead of 0 or going over length - 1).  



-----
You can browse the official documentation for arrays for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [C#](https://msdn.microsoft.com/en-us/library/system.array(v=vs.110).aspx), [Python](https://docs.python.org/2/library/array.html#module-array). 


