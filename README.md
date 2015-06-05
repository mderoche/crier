# Crier

Coming soon.



# Usage

```javascript
Crier.sub('channel-1', function (channel, a, b, c) {
  console.log(channel + ' fired: ', a, b, c);
}, 'sub-1');

Crier.pub('channel-1', 1, 2, 2);
// "channel-1 fired: 1, 2, 3"

Crier.sub('channel-2', function (channel, data) {
  console.log(data);
})

Crier.pub(/channel-/, { a: 5 });
// "channel-1 fired: {a : 5} undefined undefined"
// "channel-2 fired: {a : 5}"

Crier.unsub('channel-1', 'sub-1')

Crier.pub(/channel-/, { a: 5 });
// "channel-2 fired: {a : 5}"
```
