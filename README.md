# Crier

Coming soon.



# Usage

```javascript
// subscribe to channel-1 as sub-1
Crier.sub('channel-1', function (channel, a, b, c) {
  console.log(a, b, c);
}, 'sub-1');

// publish to channel-1
Crier.pub('channel-1', 1, 2, 2);
// "1, 2, 3"

// subscribe to channel-2 as anonymous
Crier.sub('channel-2', function (channel, data) {
  console.log(data);
})

// publish to anything that matches channel-(.*)
Crier.pub(/channel-/, { a: 5 });

// unsubscribe sub-1 from channel-1
Crier.unsub('channel-1', 'sub-1')
```
