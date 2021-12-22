export class Navigator
{
    constructor(graph)
    {
        this.graph = graph;
        this.path = [];
    }

    findShortestPath(startId, endId)
    {
        this.clear();

        const startNode = this.graph.nodes[startId];
        const endNode = this.graph.nodes[endId];

        const openList = [{ node: startNode, prev: null, cost: 0 }];  // Assume openList is sorted in descending order of cumulativeCost.

        while (openList.length > 0)
        {
            const nodeInfo = openList.pop();
            const oldNode = nodeInfo.node;
            if (oldNode.previousNode !== undefined)
            {
                continue;  // We have already found the shortest path to this node.
            }
            oldNode.cumulativeCost = nodeInfo.cost;
            oldNode.previousNode = nodeInfo.prev;

            if (oldNode === endNode)
            {
                // We are finished, return the reverse path.
                let tempNode = endNode;
                while (tempNode !== null)
                {
                    this.path.unshift({ node: tempNode, cost: tempNode.cumulativeCost });
                    tempNode = tempNode.previousNode;
                }
                break;
            }

            for (let i = 0; i < oldNode.connections.length; ++i)
            {
                const edgeInfo = oldNode.connections[i];
                if (edgeInfo.node.previousNode !== undefined)
                {
                    continue;  // This node is part of the closed list. We have already calculated its optimal path.
                }
                openList.push({ node: edgeInfo.node, prev: oldNode, cost: oldNode.cumulativeCost + edgeInfo.cost });
            }

            // Sort the openList by descending order of cumulativeCost to maintain the precondition.
            openList.sort((a, b) => b.cost - a.cost);
        }
    }

    clear()
    {
        this.path = [];
        
        // Clear any nodes dirtied in a previous search.
        for (const [id, node] of Object.entries(this.graph.nodes))
        {
            node.cumulativeCost = undefined;
            node.previousNode = undefined;
        }
    }
}