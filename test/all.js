test('the Crier global exists', function() {
  ok(Crier);
});

test('.sub() works for a single channel', function () {
  Crier.sub('channel-1', function () {}, 'sub-1');  // with id
  Crier.sub('channel-2', function () {});           // without id

  ok(Crier.chdir['channel-1'].subs[0].id === 'sub-1');
  ok(Crier.chdir['channel-2'].subs[0]);
});

test('.sub() works for multiple channels', function () {
  Crier.sub(/channel-(.*)/, function () {});
  ok(Crier.chdir['channel-1'].subs.length === 2);
  ok(Crier.chdir['channel-2'].subs.length === 2);
});

test('.channels() creates a new channel if not found', function () {
  Crier.channels('channel-2a');
  ok(Crier.chdir['channel-2a']);
});

test('.channels() returns a single channel if found', function () {
  var c = Crier.channels('channel-2a');
  ok(c.length === 1 && c[0].name === 'channel-2a');
});

test('.channels() returns all channels of a wildcard search', function () {
  var c = Crier.channels(/channel-2(.*)/);
  ok(c.length === 2 && c[0].name === 'channel-2' && c[1].name === 'channel-2a');
});

test('.subs() returns correct subscribers for a single channel', function () {
  ok(Crier.subs('channel-1').length === 2);
});

test('.subs() returns correct subscribers for a multiple channels', function () {
  ok(Crier.subs(/channel-(.*)/).length === 4);
});

test('.unsub() removes sub-1 from channel-1', function () {
  Crier.unsub('channel-1', 'sub-1')
  ok(Crier.chdir['channel-1'].subs.length === 1 && Crier.chdir['channel-1'].subs[0].id === undefined);
});

test('.unsub() removes all subs if no sub argument given', function () {
  Crier.unsub('channel-2')
  ok(Crier.chdir['channel-2'].subs.length === 0);
});

test('.clear() can remove a single or set of channels', function () {
  Crier.clear('channel-1');
  ok(Object.keys(Crier.chdir).length === 2);

  Crier.channels('channel-3a');
  Crier.channels('channel-3b');
  Crier.channels('channel-3c');
  ok(Object.keys(Crier.chdir).length === 5);
  Crier.clear(/channel-3(.*)/);
  ok(Object.keys(Crier.chdir).length === 2);
});

test('.clear() empties out all channels', function () {
  Crier.clear();
  ok(JSON.stringify(Crier.chdir) === '{}');
});

/*test('.pub() posts messages in a way that subscribers can get them', function () {
  var done = assert.async();
  Crier.sub('testpub', function (channel, data1, data2, data3, data4) {
    ok(data1 === 3.14);
    ok(data2 === 'test');
    ok(data3 === false);
    ok(data4 === {a: 5});
    ok(data5 === [1, 2]);
    done();
  });

  Criar.pub('testpub', 3.14, 'test', false, {a: 5}, [1,2]);
});*/
