# Assignment1-CS2410-Data-Processing
CS2410 Assignment 1 for Joseph Ditton's class

#Assignment Description

You have been contracted by Figs Unlimited - a company that runs a global marketplace for Fig based Jams and Jellies. They have a pretty sizeable database of transaction history and have contracted you to write some code that will help them gather some information from this data. This project will be a test of your fledgling JavaScript abilities.

##Objectives
Write a JavaScript program
Implement and use Higher Order functions
Submit an Assignment
Requirements
Figs Unlimited has given you 2 arrays of data. The first is a list of transactions. A transaction has the following form:

{
  id: 12345, // a number uniquely identifying the transaction
  amount: 110.85, // a number indicating the amount in dollars the transaction was for
  product: "FIG_JAM", // a string indicating the type of product; one of ["FIG_JAM", "FIG_JELLY", "SPICY_FIG_JAM", "ORANGE_FIG_JELLY"]
  customerId: 12345, // a number that stores the ID of the customer that made the transaction.
}
The second set of data is a list of customers. A customer has the following form:

{
  id: 34567, // a number that uniquely identifies a customer
  firstName: "Alan",
  lastName: "Turing",
  emailAddress: "alan.turing@internet.com"
}
Figs Unlimited would like you to produce a program that answers the following questions:

How many invalid transactions are there?

A transaction is considered invalid if the amount is $0 or is missing altogether (either null or undefined)

A transaction is considered invalid if the product is not one of the 4 valid values: FIG_JAM, FIG_JELLY, SPICY_FIG_JAM, or ORANGE_FIG_JELLY.

The output should be a single number.

 

How many duplicate customers are there?

A customer is considered a duplicate if they have the same email address as another customer but a different id.

The output should be a single number.

 

How much was the most recent transaction that was over $200?

The output should be a single number.

 

How many small, medium, and large transactions are there?

A transaction under $25 is considered small. A transaction between $25 and $75 is considered medium. Transactions $75 and over are considered large. They would like the output in the following form.

// the real numbers will be different than this.
{
  small: 2437, 
  medium: 1101,
  large: 233,
}
You should determine the value from the full dataset, recognizing that you know there are invalid transactions in there.

 

Which customers have at least one transaction over $200?

They would like this result stored in 2 different formats: first is a list of customer objects, second is a list of strings where each string is the first and last name of the customer separated by a space. For example:

[
  "Alan Turing",
  "Charles Babbage",
  "Ada Lovelace"
]
Again you should use the full transactions dataset for this even though there are invalid transactions in there. You should also ignore that fact that there are duplicate customers for this calculation and they should be included as part of the result.

On top of these questions, Figs Unlimited is sure they will have more questions so they would like you to produce code that can be reused later to answer new questions as they come up. Additionally, they request that an any calculation you perform do not modify the original dataset. 

As you analyze the requirements you find that all of these questions (and many, many more) can be answered through the combined usage of only 5 functions: filter, findLast, map, pairIf, and reduce. The following section explains of each of these 5 function. 

filter
/*
  filter: returns a subset of the input data that contains only the items for which the predicate returns true
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a new array that contains all of the values in data
           for which the predicate function returns true
*/
function filter(data, predicate)
Example Usage
```
const data = [1,2,3,4,5,6,7];
const result = filter(data, x => x % 2 === 0);
console.log(result); // [2,4,6];
 ```

findLast
/*
  findLast: finds the last value in an array that meets the condition specified in the predicate
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a single data point from data
*/
function findLast(data, predicate)
Example usage
```
const data = [1,2,3,4,5,6,7];
const result = findLast(data, x => x % 2 == 0);
console.log(result); // 6
 ```

map
/*
  map: creates a new array based on the input array where the value at each position in the array is the result of the callback function.
  @data: an array of any arbitrary data
  @callback: a function that takes a single datapoint as an argument. Returns a new value based on the input value
  @return: a single data point from data
*/
function map(data, callback)
Example Usage
```
const data = [1,2,3,4,5,6,7];
const doubles = map(data, x => x * 2);
console.log(doubles); // [2,4,6,8,10,12,14];
const strings = map(data, x => `${x}`);
console.log(strings); // ["1","2","3","4","5","6","7"];
 ```

pairIf
/*
  pairIf: creates a new array based on the input arrays where the value at each position is an 
          array that contains the 2 values that pair according to the predicate function.
  @data1: an array of any arbitrary data
  @data2: an array of any arbitrary data
  @predicate: a function that takes a single datapoint from each input array as an argument. Returns true or false
  @return: a single data point from data
*/
function pairIf(data1, data2, callback)
Example Usage
```
const labels = ["positive", "negative"];
const nums = [1, -3, -5, 12];
const pairs = pairIf(labels, nums, (label, num) => {
  return (label === "negative" && num < 0) || (label === "positive" && num >= 0);
});
console.log(pairs); // [["positive", 1], ["positive", 12], ["negative", -3], ["negative", -5]];
 ```

reduce
/*
  reduce: creates an accumulated result based on the reducer function. The value returned is returned
          is the return value of the reducer function for the final iteration.
  @data: an array of any arbitrary data
  @reducer: a function that takes a single datapoint from each input array as an
            argument and the result of the reducer function from the previous iteration.
            Returns the result to be passed to the next iteration
  @initialValue: the starting point for the reduction.
  @return: the value from the final call to the reducer function.
*/
function reduce(data1, reducer, initialValue)
Example Usage

```
const nums = [1,2,3,4,5];
const sum = reduce(nums, (value, accumulatedResult) => value + accumulatedResult, 0);
console.log(sum); // 15
```
```
const evensAndOdds = reduce(nums, (value, acc) => {
  if (value % 2 == 0) {
    acc.evens.push(value);
  } else {
    acc.odds.push(value);
  }
  return acc;
}, {evens: [], odds: []});

console.log(evensAndOdds); //{evens: [2,4], odds: [1,3,5]};
```
 

Instructions
Click here  Download hereto download the JavaScript file that contains the data. You are given two variables you can use, one called transactions, and another called customers. This is just a JavaScript file and declares the 2 variables you need.

You should write your code in a separate JavaScript file, call your JavaScript file "solution.js". In your html file, include the downloaded dataset file first and then your JavaScript file. You will submit only your solution.js file.

You should include the dataset as a script tag in your html first, then you solution.js file like so:

<script src="dataset.js></script>
<script src="solution.js></script>
Then in your solution.js file you can verify that you have the dataset by just logging each of the variables out.

console.log(transactions);
console.log(customers);
You are to implement each of those 5 functions and use them, and only them to answer Figs Unlimited's questions. Here is a breakdown of which functions can be used to solve each question:

How many invalid transactions are there?:  filter,

This one is pretty straight forward I think and is a good test to make sure your filter function is working. You are allowed to use the length attribute to determine the length of the result array. 

 

How many duplicate customers are there?: pairIf

You can pass the same list of data for both arguments. Keep in mind though that this will result in 2 entries for each combination. You can just devide the result length by 2 to get the final result

 

How much was the most recent transaction that was over $200? findLast

You can assume that the list of transactions is in order by transaction date.

 

How many small, medium, and large transactions are there? reduce

A good test for your reduce function.

 

Which customers have at least one transaction over $200? pairIf, reduce, filter, map

This question is the hardest to answer. Here is how you might approach this problem:

Filter the list to get only transactions over $200
Pair each transaction with it's customer
Reduce the pairs into a list of unique customers (this result is first required output).
For this one you are allowed to use the Array.includes method, for example `accumulatedResult.includes(customer)`. It returns a true or false.
Map over the reduced list to get the names of the customers.
Output
You program should produce the following output.

Number of invalid transactions: 43
Number of duplicate customers: 28
Most recent transaction over $200: $232.53
Number of small transactions: 2432
Number of medium transaction: 234
Number of large transactions: 43
Customers with transactions over $200:
[...]
Names of customers with transactions over $200"
[...] 
Your numbers will vary from this example. For the last 2 outputs you can just console.log the 2 arrays. Keep in mind that it will look a little different than this in the JavaScript console but that is just fine.
