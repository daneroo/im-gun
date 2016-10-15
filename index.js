const port = process.env.PORT || process.argv[2] || 8080;

const peers = [8080, 8081, 8082].filter(peer => !(peer == port)).map(peer => `ws://127.0.0.1:${peer}/gun`)
// const peers = [`ws://127.0.0.1:${(port == 8080) ? 8081 : 8080}/gun`]
// const peers = (port == 8080) ? [] : [`ws://127.0.0.1:8080/gun`]

const file = `data/data-${port}.json`

const express = require('express');
const omit = require('lodash.omit');

const app = express();

var Gun = require('gun');
var gun = Gun({
  peers: peers,
  file: file
});

gun.wsp(app);
app.use(express.static('public')).listen(port);

console.log('Server started on port ' + port + ' with /gun');
console.log('  and file: ' + file);
console.log('  and peers: ' + peers);


var shared = gun.get('shared');

let tick = Math.floor(100 * Math.random());
setInterval(function () {
  const name = `localhost:${port}`
  tick = (tick + 1) % 100
  const o = {
    tick: `${tick}`,
    now: new Date().toISOString()
  }
  console.log()
  console.log(`-shared[${name}] << ${show(o)}`)
  shared.path(name).put(o)
}, 3000)

const accum = {};
shared.map(function (o, name) {
  console.log(`-shared[${name}] >> ${show(o)}`)
  accum[name] = clean(o)
  console.log(JSON.stringify(accum, null, 2))
}, { change: true })

shared.val()

function show(o) {
  return JSON.stringify(clean(o))
}
function clean(o) {
  return omit(o, '_')
}