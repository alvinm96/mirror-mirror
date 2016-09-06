/**
 * Created by danb on 4/15/16.
 */

/**
 * Initializes a new empty `RingBuffer` with the given `capacity`, when no
 * value is provided uses the default capacity (50).
 *
 * @param {capacity}
 * @return {RingBuffer}
 * @api public
 */
function RingBuffer(capacity) {
  this._capacity = capacity || 10;
  this._buffers = new Array(this._capacity );
  this._first = 0;
  this._last = 0;
  this._size = 0;
  this._highWaterMark = 0;
  this._buffersEnqueued = 0;
  this._buffersDequeued = 0;
}

/**
 * Returns the capacity of the ring buffer.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.capacity = function() {
  return this._buffers.length;
};

/**
 * Returns the high water mark.
 *
 * @return {number}
 * @api public
 */
RingBuffer.prototype.highWaterMark = function() {
  return this._highWaterMark;
};

/**
 * Returns the number of buffers enqueued.
 *
 * @return {number}
 * @api public
 */
RingBuffer.prototype.buffersEnqueued = function() {
  return this._buffersEnqueued;
};

/**
 * Returns the number of buffers dequeued.
 *
 * @return {number}
 * @api public
 */
RingBuffer.prototype.buffersDequeued = function() {
  return this._buffersDequeued;
};


/**
 * Returns the total number of samples enqueued.
 *
 * @return {number}
 * @api public
 */
// RingBuffer.prototype.totalSamplesDequeuedEnqueued = function() {
//   return this._totalSamplesEnqueued;
// };

/**
 * Returns the total number of samples dequeued.
 *
 * @return {number}
 * @api public
 */
// RingBuffer.prototype.totalSamplesDequeuedDequeued = function() {
//   return this._totalSamplesDequeued;
// };

/**
 * Returns whether the ring buffer is empty or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isEmpty = function() {
  return this.size() === 0;
};

/**
 * Returns whether the ring buffer is full or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isFull = function() {
  return this.size() === this.capacity();
};

/**
 * Peeks at the top element of the queue.
 *
 * @return {Object}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.peek = function() {
  var element = null;
  if (this.isEmpty()) throw new Error('RingBuffer is empty');

  return this._buffers[this._first];
};

/**
 * Dequeues the top element of the queue.
 *
 * @return {Object}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.dequeue = function() {
  var element = this.peek();

  ++this._buffersDequeued;

  this._size--;
  this._first = (this._first + 1) % this.capacity();

  return element;
};

/**
 * Enqueues the `element` at the end of the ring buffer and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.enqueue = function(element) {
  this._end = (this._first + this.size()) % this.capacity();
  this._buffers[this._end] = element;

  if (this.isFull()) {
    this._first = (this._first + 1) % this.capacity();
  } else {
    this._size++;
    this._highWaterMark = (this._size > this._highWaterMark)? this._size : this._highWaterMark;
  }

  ++this._buffersEnqueued;

  return this.size();
};

/**
 * Returns the size of the queue.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.size = function() {
  return this._size;
};

/**
 * Returns capaciity after clearing existing buffers storage
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.clearBuffers = function() {
  this._buffers = new Array(this._capacity);
  return this.capacity();
};
