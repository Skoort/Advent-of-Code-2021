import { Node } from './node.js';

export class Graph
{
    constructor()
    {
        this.nodes = {};
    }

    get size()
    {
        return Object.keys(this.nodes).length;
    }

    insertNode(id, canReenter = false)
    {
        if (id in this.nodes)
        {
            throw new Error('insertNode(id): A node with this id already exists.');
        }

        this.nodes[id] = new Node(id, canReenter);
    }

    deleteNode(idToDelete)
    {
        if (!(idToDelete in this))
        {
            throw new Error('deleteNode(id): There is no id with this id.');
        }

        delete this.nodes[idToDelete];

        for (const [id, node] of Object.entries(this))
        {
            node.connections = node.connections.filter(x => x.id != id);
        }
    }

    connect(id1, id2, cost = 1)
    {
        const node1 = this.nodes[id1];
        const node2 = this.nodes[id2];
        node1.connections.push({ node: node2, cost: cost });
        node2.connections.push({ node: node1, cost: cost });
    }
}