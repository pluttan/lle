<div align="center">

# lle

**TypeScript library for modeling, connecting, and visualizing logic gates with signal race simulation**


</div>

A comprehensive toolkit for circuit designers: create, connect, and combine logic elements, render circuit diagrams, and simulate signal races — all through a straightforward programmatic API. Static and dynamic elements, flexible multi-input connections, element graphs, and a clock-cycle-accurate modeling engine are bundled into one cohesive library published to npm as `ldamle`.

## ■ Features

- ❖ **Static elements** — define inputs, outputs, and the full truth-table mapping of output signals to input combinations
- ❖ **Dynamic elements / Generators** — produce a square wave at a set frequency; chain static elements onto generators to build complex dynamic circuits
- ❖ **Standard element set** (`lle.stde`) — ready-made gates (AND, OR, NOT, etc.) available out of the box
- ❖ **Connection model** — typed `Connection` objects carry signal state between elements; one output, multiple inputs supported per connection
- ❖ **Element graphs** — a directed graph is built for every element, tracing all upstream and downstream connections; requires at least one generator in the chain
- ❖ **Clock-cycle simulation** — a topological queue derived from the graph evaluates every element state at each tick of the target frequency, accurately reproducing signal races
- ❖ **Graph visualization** — D3-powered SVG view renders the element graph in the browser via a local Express server
- ❖ **Full test coverage** — Jest suites with nyc instrumentation cover every class and factory; coverage reports published to GitHub Pages

## ■ Stack

<div align="center">

| Component | Technology |
|-----------|-----------|
| Language | TypeScript 5.5 |
| Runtime | Node.js |
| Visualization | D3.js (SVG graph layout) |
| Canvas rendering | React + react-konva |
| Dev server | Express 4 |
| Testing | Jest + nyc (coverage) |
| Bundler | Webpack 5 |
| Documentation | TypeDoc + docsify |

</div>

## ■ How It Works

```
1. Create Element / Generator instances, wiring them via Connection objects
2. An ElementGraph traverses the full dependency chain from every generator
3. The graph is linearized into a topological evaluation queue
4. The Model steps the queue at each clock cycle, propagating signal states
5. Signal races emerge naturally from the propagation order and gate delays
6. graphView renders the dependency tree as a zoomable D3 SVG in the browser
```

## ■ Usage

```sh
# Start a new Node project
npm init

# Add the library
npm install ldamle
```

```js
import * as lle from 'ldamle';

// Create a standard AND gate
const and = new lle.stde.AND();

// Wire up a generator and run the model
const clk = new lle.Generator(1000); // 1 kHz square wave
```

> Full API reference: [pluttan.github.io/lle/docs/documentation/](https://pluttan.github.io/lle/docs/documentation/)

## ■ Test Coverage

All classes are covered by Jest suites with nyc instrumentation. Coverage reports are published to GitHub Pages:

- [Full coverage](https://pluttan.github.io/lle/test/coverage/all/)
- [Connection class](https://pluttan.github.io/lle/test/coverage/connection/)
- [Element & Generator classes](https://pluttan.github.io/lle/test/coverage/element/)
- [ElementGraph class](https://pluttan.github.io/lle/test/coverage/elementgraph/)
- [Types & factories](https://pluttan.github.io/lle/test/coverage/general/)

## ■ License

MIT © [pluttan](https://github.com/pluttan)
