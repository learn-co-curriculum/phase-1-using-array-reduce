# Using the Array Reduce Method

## Learning Goals

- Learn how the `Array.prototype.reduce()` method works
- Demonstrate using `Array.prototype.reduce()`

## Introduction

| Use Case                                                       | Method                |
| -------------------------------------------------------------- | --------------------- |
| Executing a provided callback on each element                  | `forEach()`           |
| Finding a single element that meets a condition                | `find()`, `indexOf()` |
| Finding and returning a list of elements that meet a condition | `filter()`            |
| Modifying each element and returning the modified array        | `map()`               |
| ** Creating a summary or aggregation of values in an array     | `reduce()`            |

In the world of programming, we often work with lists. Sometimes we want to find
or transform elements in a list, but other times we might want to create a
single summary value. In this lesson, we'll learn how to use the `reduce()`
iterator method to **aggregate** a result, i.e., to _reduce_ a list to a single
value. That value can be a string, a number, a boolean, etc.

To better understand how `reduce()` works, we'll start by building our own
version.

## Learn How the `reduce()` Method Works

Let's say we have a bunch of grocery items in our basket and we want to
calculate the total price. Our basket data might look like this:

```js
const products = [
  { name: "Shampoo", price: 4.99 },
  { name: "Donuts", price: 7.99 },
  { name: "Cookies", price: 6.49 },
  { name: "Bath Gel", price: 13.99 },
];
```

We're going to _reduce_ the array of products to a _single value_: the total
price. To do this, we'll create a `getTotalAmountForProducts()` function:

```js
function getTotalAmountForProducts(products) {
  let totalPrice = 0;

  for (const product of products) {
    totalPrice += product.price;
  }

  return totalPrice;
}

console.log(getTotalAmountForProducts(products)); // LOG: 33.46
```

We first declare a `totalPrice` variable and set its initial value to 0. We then
iterate through the products in the basket and add the price of each to the
total. When the loop has finished, we return the `totalPrice`.

This is a very basic way to manually add together the prices of the products we
want to buy, but it only works for this very specific situation: iterating
through an array of objects, each of which has a `price` property, adding
together all the prices, and returning the total.

What if we wanted to calculate something else, say, the number of coupons we
have lying around the house? We can make our solution more abstract by creating
a separate reducer function that implements the reduce functionality we want and
passing that in to `reduce()` as an argument:

```js
const couponLocations = [
  { room: "Living room", amount: 5 },
  { room: "Kitchen", amount: 2 },
  { room: "Bathroom", amount: 1 },
  { room: "Master bedroom", amount: 7 },
];

function reduce(arr, reducer) {
  let accum = 0;
  for (const element of arr) {
    accum = reducer(accum, element);
  }
  return accum;
}

function couponCounter(totalAmount, location) {
  return totalAmount + location.amount;
}

reduce(couponLocations, couponCounter);
// => 15
```

Let's walk through what's happening here:

1. In the last line, we call `reduce()` and pass in the two arguments: the
   input array (`couponLocations`) and the reducer function (`couponCounter`).
2. `reduce` first initializes the accumulator variable (`accum`) to 0, then
   begins iterating through the input array.
3. Within each iteration, `reduce` calls our reducer function, passing the
   current value of the accumulator and the current element as arguments.
4. The reducer function adds together the current value of `accum` and the value
   of the `amount` property of the current element of the array and returns that
   sum.
5. That returned value becomes the current version of `accum` for the next
   iteration.
6. Once `reduce` has iterated through all the elements in the array, it
   returns the final value of `accum`, i.e., the total number of coupons.

But there's still a bit more abstraction we can do. What if we already have
three coupons in our hand? We could change the initial value of the `accum`
variable inside `reducer()`, but that would make our function less
generalized. Instead, we can have `reducer()` take a third argument: the
initial value to use for the accumulator:

```js
const couponLocations = [
  { room: "Living room", amount: 5 },
  { room: "Kitchen", amount: 2 },
  { room: "Bathroom", amount: 1 },
  { room: "Master bedroom", amount: 7 },
];

function reduce(arr, reducer, init) {
  let accum = init;
  for (const element of arr) {
    accum = reducer(accum, element);
  }
  return accum;
}

function couponCounter(totalAmount, location) {
  return totalAmount + location.amount;
}

reduce(couponLocations, couponCounter, 3);
// => 18
```

Now our accumulator variable is initialized to 3 instead of 0. And if we cut a
couple more coupons out of the newspaper, we can easily calculate the new total
without changing any code.

To summarize, `reduce()` accepts three arguments: the array we want to
reduce, the callback function or _reducer_, and the initial value for our
_accumulator_ variable. It then iterates over the array, calling the reducer
function each time, which returns the updated value of the accumulator, which in
turn becomes input for the reducer function in the next iteration. The final
value of the accumulator is returned at the end.

Note that our version of `reduce()` is now fully generalized: the specifics (the
callback function and initial value) have been abstracted out, making our code
more flexible.

## Demonstrate using `Array.prototype.reduce()`

With JavaScript’s native `reduce()` method, we don't need to write our own
version. Just like our `reduce()` function, the `Array.prototype.reduce()`
method is used when we want to get some information from each element in the
collection and gather that information into a final summary value. Let's take
the native implementation for a spin with our previous example:

```js
// the input array
const couponLocations = [
  { room: "Living room", amount: 5 },
  { room: "Kitchen", amount: 2 },
  { room: "Bathroom", amount: 1 },
  { room: "Master bedroom", amount: 7 },
];

// the callback function, often referred to as the reducer function
function couponCounter(totalAmount, location) {
  return totalAmount + location.amount;
}

couponLocations.reduce(couponCounter, 0);
// => also logs 15!
```

Let's walk through this step by step:

1. At the bottom, we call `reduce()` on our array and pass the callback (or
   reducer function) and the start value as arguments.
2. Before starting to iterate through the array, `reduce()` sets the value of
   the accumulator variable to the start value that was passed in.
3. Next, `reduce()` calls the reducer function, passing two values: the current
   element of the array and the current value of the accumulator variable.
4. The reducer, `couponCounter`, adds the two values together and returns the
   total.
5. `reduce()` then calls the reducer function again, passing the next element in
   the array and the updated value of the accumulator that was returned by the
   reducer in the previous step.
6. This continues until the iteration is complete, and `reduce()` returns the
   final value of the accumulator.

<details><summary><b>What is different about calling `.reduce()` vs. any of the other iterator methods?</b></summary>
<ul>
<li><code>reduce()</code> takes a callback function (the reducer) like the other methods, but it also takes a second argument: the start value</li>
</ul>
</details>

Another simple numerical example:

```js
const nums = [1, 2, 3];
function doubleAndSum(accumulator, element) {
  return element * 2 + accumulator;
}

const doubledAndSummed = nums.reduce(doubleAndSum, 0);
// => 12
```

To review: here, as in the previous example, we are calling `.reduce()` on our
input array and passing it two arguments: the reducer and an optional start
value for the accumulator (0 in this example). `.reduce()` executes the callback
for each element in turn, passing in the current value of the accumulator and
the current element each time. The callback updates the value of the accumulator
in each iteration, and that updated value is then passed as the first argument
to the callback in the next iteration. When there's nothing left to iterate, the
final value of the accumulator (the total) is returned.

The initialization value is optional, but leaving it out might lead to a real
surprise. If no initial value is supplied, the _first element in the array_ is
used as the starting value. `reduce()` then executes the callback function,
passing this starting value and the _second_ element of the array as the two
arguments. In other words, the code inside the callback **is never executed**
for the first element in the array.

This works fine in some cases, for example, if the reducer is simply summing the
values of the input array:

```js
const nums = [1, 2, 3];
function sumValues(accumulator, element) {
  return element + accumulator;
}

const summedValues = nums.reduce(sumValues);
// => 6
```

Here, there is no start value, so `reduce()` sets the accumulator equal to the
first element in the array, `1`. It then starts the iteration with the second
element `2`, adds those together to get 3, passes that value to the final
iteration, and finally returns the total, `6`.

> Before moving on, think through what would happen if we passed a start value
> of `0` to `reduce()` in the example above and make sure you understand why the
> same total would be returned.

However, with more complicated reducers, not passing a start value can lead to
unexpected results. Looking again at our `doubleAndSum` example:

```js
const nums = [1, 2, 3];
function doubleAndSum(accumulator, element) {
  return element * 2 + accumulator;
}

const doubledAndSummed = nums.reduce(doubleAndSum);
// => 11
```

Here, because we didn't pass a start value, `reduce()` sets the accumulator
variable equal to the first element in the array and doesn't pass that value
into the reducer. As a result, the first element (`1`) _does not get doubled_
and the final total is `11` rather than `12`.

To be safe, it is best to always pass a start value when calling `reduce()`. Of
course, that initial value can be anything we like:

```js
const doubledAndSummedFromTen = nums.reduce(doubleAndSum, 10);
// => 22
```

**REMOVED EXAMPLE WITH OBJECT AS RETURN VALUE - NEEDS TO MOVE LATER**

**TAKE OUT LAB PORTION?**

## Lab: Use `reduce()` to Create a Single Aggregate of All Items in a List

Let's say we are hard at work in the battery factory. We've assembled several
batches of batteries today. Let's count how many assembled batteries we ended
up with.

- Create a new variable called `totalBatteries`, which holds the sum of all of
  the battery amounts in the `batteryBatches` array. (Note that the
  `batteryBatches` variable has been provided for you in `index.js`.) Naturally,
  you should use `reduce()` for this!

Remember the workflow:

1. Install the dependencies using `npm install`.
2. Run the tests using `npm test`.
3. Read the errors; vocalize what they're asking you to do.
4. Write code; repeat steps 2 and 3 often until a test passes.
5. Repeat as needed for the remaining tests.

After you have all the tests passing, remember to commit and push your changes
up to GitHub, then submit your work to Canvas using CodeGrade.

## Conclusion

The `reduce()` method can be a bit tricky to wrap your head around at first.
Keeping the following in mind should help:

1. When you call `reduce()`, you should pass two arguments: the callback (or
   reducer) and a start value for the accumulator. Even though the start value
   is optional, always including it will help you avoid unexpected results and
   it will make your code clearer.
2. `reduce()` will automatically pass two arguments when it calls your reducer
   function: the current element of the array and the current value of the
   accumulator. Your function needs to accept those two values as parameters,
   combine them in some way, and return the result so `reduce()` can use it in
   the next iteration.

The advantage of using `reduce()`, of course, is that it makes it possible to
quickly get a single summary value from the elements in an array without having
to write the looping code ourselves. `reduce()` — like the other iterator
methods we've learned about in this section — can greatly cut down the amount of
time spent recreating common functionality. It can also make our code more
efficient and expressive.

## Resources

- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
