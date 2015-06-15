# Crier

CrierJS is a non-convoluded publish-subscription system for JavaScript and NodeJS. Subscribers hook into a channel and wait for any sort of data to get thrown onto it; publishers throw data onto channels that subscribers are (maybe) watching. With this model, the publishers and subscribers aren't friends, relatives, or even acquaintances—in fact, they don't even know that the other exists (promoting loose coupling and scalability). There are no dependencies and it works (tested) in Node, all popular browsers, and IE8.

# Synopsis

``` javascript
Crier.sub('channel-1', function (ch, a, b) {
  console.log('channel ' + ch + ' got data ', a, b);
});

Crier.pub('channel-1', 2015, 'foo');
// "channel channel-1 got data 2015 foo"
```

# More Information
http://mderoche.github.io/crier/
