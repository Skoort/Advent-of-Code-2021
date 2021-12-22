import { Graph } from './../Common/graph.js';
import { Navigator } from './navigator.js';

let input = `
dr-of
start-KT
yj-sk
start-gb
of-start
IJ-end
VT-sk
end-sk
VT-km
KT-end
IJ-of
dr-IJ
yj-IJ
KT-yj
gb-VT
dr-yj
VT-of
PZ-dr
KT-of
KT-gb
of-gb
dr-sk
dr-VT`;
// Uncomment for test 1.
// input = `
// start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end`;
// Uncomment for test 2.
// input = `
// dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc`;

const connections = input.trim().split('\n').map(line => line.split('-'));

const nodes = new Set();
for (let row = 0; row < connections.length; ++row)
{
    nodes.add(connections[row][0]);
    nodes.add(connections[row][1]);
}

console.log(connections);
console.log(nodes);

const graph = new Graph();
for (const id of nodes)
{
    const firstLetter = id.charAt(0);
    graph.insertNode(id, firstLetter == firstLetter.toUpperCase());
}

for (let i = 0; i < connections.length; ++i)
{
    graph.connect(connections[i][0], connections[i][1]);
}

console.log(graph.nodes);

const navigator = new Navigator(graph);
navigator.findPaths('start', 'end');

console.log('Part 1:', `There are exactly ${navigator.paths.length} paths from 'start' to 'end' visiting each small "cave" at most once.`);

navigator.findPaths2('start', 'end');

// const paths = navigator.paths.map(path => path.join(','));
// paths.sort();
// for (let i = 0; i < paths.length; ++i)
// {
//     console.log(paths[i]);
// }

console.log('Part 2:', `There are exactly ${navigator.paths.length} paths from 'start' to 'end' visiting each small "cave" at most once, but one small "cave" can be visited twice exceptionally.`);
