const { EventEmitter } = require('events');

/**
 *
 * @param {number} _maxConcurrency
 * @param {array - function} results
 */
function QueueFunction(_maxConcurrency, results = []) {
  if (typeof _maxConcurrency !== 'number') {
    throw new Error('typeof maxConcurrency must be number');
  }
  if (!Array.isArray(results) || !results.every((v) => typeof v === 'function')) {
    throw new Error('Results must be array function');
  }
  _maxConcurrency = _maxConcurrency || 1;
  this.queue = new EventEmitter();
  this.results = results;
  this.concurrency = 0; // default is 0
  this._maxConcurrency = _maxConcurrency;
  if (this.results.length > 0) {
    this._execute();
  }
}

/**
 *
 * @param {string} nameEvent
 * @param {function} fn
 */
QueueFunction.prototype.on = function (nameEvent, fn) {
  if (typeof nameEvent !== 'string') {
    throw new Error('typeof nameEvent must be string');
  }
  if (typeof fn !== 'function') {
    throw new Error('typeof nameEvent must be string');
  }
  this.queue.on(nameEvent, fn);
};

QueueFunction.prototype.done = function (fn) {
  this.concurrency--;
  this.queue.emit('exist', fn);
  this._execute();
};

/**
 *
 * @param {function} fn
 */
QueueFunction.prototype._execute = async function () {
  try {
    if (this.concurrency < this._maxConcurrency && this.results.length > 0) {
      const fn = this.results.pop();
      if (fn) {
        this.concurrency++;
        this.queue.emit('running', fn);
        try {
          await fn();
        } catch (error) {
          this.queue.emit('error', error);
        }
        this.done(fn);
      }
    }
  } catch (error) {}
};

QueueFunction.prototype.push = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error('Push function only');
  }
  this.results = [fn, ...this.results];
  this._execute();
};

module.exports = QueueFunction;
