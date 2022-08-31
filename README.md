# Queue function , Queue function in api

#### Node API adapter in ECMAScript 2015 (ES6)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/queue-function-api) [![npm](https://cafedev.vn/wp-content/uploads/2020/07/cafedev_queue_c.png)](https://www.npmjs.com/package/queue-function-api)

## Table of Contents

- [Installation](#installation)
- [How to start](#how-to-start)
- [Receive Messages](#example)
    
## Installation

Install the `queue-function-api` package in your node server app's local `node_modules` folder.

```bash
npm i queue-function-api
```

### How to start

```bash
const QueueFunction = require('queue-function-api');

/**
 *
 * @param {number} _maxConcurrency
 * @param {array - function} results
 */
const queue = new QueueFunction(1, []);
queue.on('running', function (fn) {
    console.log(fn)
});
queue.on('exist', function (error) {
    if(error){
        console.log(error)
    }
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

queue.push(async function one() {
  await delay(2000);
  console.log(1);
});

queue.push(async function two() {
  await delay(2000);
  console.log(2);
});

queue.push(async function three() {
  await delay(2500);
  console.log(3);
});

queue.push(async function four() {
  await delay(2000);
  console.log(5);
});

queue.push(async function one() {
  await delay(2000);
  console.log(1);
});

queue.push(async function two() {
  await delay(2000);
  console.log(2);
});

queue.push(async function three() {
  await delay(2500);
  console.log(3);
});

queue.push(async function four() {
  await delay(2000);
  console.log(5);
});
```