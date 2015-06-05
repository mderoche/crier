/*!
 *  Crier - v1.0.0
 *  Copyright (c) 2015 Mike Deroche
 *  Licensed MIT
 */
var Crier = (function (root) {

  /**
   * Polyfill for Array.forEach() (shortened)
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */
  var forEach = function (arr, callback, thisArg) {
    var T, k;
    var O = Object(arr);
    var len = O.length >>> 0;

    if (arguments.length > 1) { T = thisArg; }

    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };


  /**
   *
   * Channel
   *   An object where data is published and picked up by subscribers
   *
   */
  var Channel = function (name) {
    this.name = name;
    this.subs = [];
  };

  /**
   * Publish to this channel
   */
  Channel.prototype.pub = function () {
    var args = [].slice.call(arguments);
    args.shift();
    args.unshift(this.name);

    forEach(this.subs, function (sub) {
      sub.fn.apply(undefined, args);
    }, this);
  };

  /**
   * Subscribe to this channel
   */
  Channel.prototype.sub = function (sub) {
    this.subs.push(sub);
  };

  /**
   * Unsubscribe from this channel
   */
  Channel.prototype.unsub = function (fnId) {
    if (!fnId) {
      this.clear();
      return;
    }

    var idx = this.subIndex(fnId);
    if (!!~idx) {
      this.subs.splice(idx, 1);
    }
  };

  /**
   * Clear all subscribers from this channel
   */
  Channel.prototype.clear = function () {
    this.subs = [];
  };

  /**
   * Find the location of the given subscriber in the subscriber List
   * for this channel
   */
  Channel.prototype.subIndex = function (fnId) {
    var prop = (fnId instanceof Function) ? 'fn' : 'id';
    for (var i = 0; i < this.subs.length; i++) {
      if (this.subs[i][prop] === fnId) {
        return i;
      }
    }
    return -1;
  };


  /**
   *
   * Crier
   *   Manages channels and abstracts the pub/sub model
   *
   */
  var Crier = function () {
    this.chdir = {};
  };

  /**
   * Gets the list of current channels registered to the crier as an array
   */
  Crier.prototype.channelsAsArray = function () {
    var res = [];

    for (var c in this.chdir) {
      res.push(this.chdir[c]);
    }

    return res;
  };

  /**
   * Gets references to the desired channels.  If the search argument is a
   * regular expression, it will return references to all channels that match
   * that regex.  If the search argument is a string, it will find or create
   * the single channel with that name.
   */
  Crier.prototype.channels = function (search) {

    // handle case for searching as a pattern
    if (search instanceof RegExp) {
      var res = [];

      for (var c in this.chdir) {
        if (search.test(c)) {
          res.push(this.chdir[c]);
        }
      }

      return res;
    }

    // handle case for searching for a specific channel
    // (will also create the channel if it does not exist)
    if (!this.chdir[search]) {
      this.chdir[search] = new Channel(search);
    }
    return [this.chdir[search]];
  };

  /**
   * Publish to channel(s)
   */
  Crier.prototype.pub = function (channels) {
    var args = arguments;
    forEach(this.channels(channels), function (channel) {
      channel.pub.apply(channel, args);
    }, this);
  };

  /**
   * Subscribe to channel(s)
   */
  Crier.prototype.sub = function (channels, fn, id) {
    forEach(this.channels(channels), function (channel) {
      channel.sub({
        id: id,
        fn: fn
      });
    }, this);
  };

  /**
   * Unsubscribe from channel(s)
   */
  Crier.prototype.unsub = function (channels, fnId) {
    forEach(this.channels(channels), function (channel) {
      channel.unsub(fnId);
    }, this);
  };

  /**
   * List all subscribers of channel(s)
   */
  Crier.prototype.subs = function (channels) {
    var res = [];

    forEach(this.channels(channels), function (channel) {
      res.push.apply(res, channel.subs);
    }, this);

    return res;
  };

  /**
   * Clear channels (and subscribers) from this crier
   */
  Crier.prototype.clear = function (channels) {
    forEach(this.channels(channels || /.*/), function (channel) {
      delete this.chdir[channel.name];
    }, this);
  };

  // create a Crier
  return new Crier();
})(window);
