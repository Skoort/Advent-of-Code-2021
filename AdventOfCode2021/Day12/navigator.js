export class Navigator
{
    constructor(graph)
    {
        this.graph = graph;
        this.paths = [];
    }

    // Finds all paths starting at node with id startId and ending at node with id endId, visiting each node at most one time.
    findPaths(startId, endId)
    {
        let visit = (node, path = []) =>
        {
            if (!node.canReenter && node.visits > 0)
            {
                return;
            }

            ++node.visits;
            
            if (node.id == endId)
            {
                this.paths.push([...path, node.id]);
                --node.visits;
                return;
            }

            for (let i = 0; i < node.connections.length; ++i)
            {
                visit(node.connections[i].node, [...path, node.id]);
            }

            --node.visits;
        }

        this.clear();

        visit(this.graph.nodes[startId]);
    }

    // Finds all paths starting at node with id startId and ending at node with id endId, visiting each node at most one time.
    // It can only visit one small cave twice.
    findPaths2(startId, endId)
    {
        // This time its possible that an identical path was found in a previous search.
        let checkIfPathAlreadyFound = path =>
        {
            for (let i = 0; i < this.paths.length; ++i)
            {
                const otherPath = this.paths[i];

                if (path.length != otherPath.length)
                {
                    continue;
                }

                let matches = true;
                for (let j = 0; j < otherPath.length; ++j)
                {
                    if (path[j] != otherPath[j])
                    {
                        matches = false;
                        break;
                    }
                }

                if (matches)
                {
                    return true;
                }
            }
            return false;
        };

        let visit = (node, path = []) =>
        {
            if (!node.canReenter && node.visits > 0 && !(node.canVisitTwice && node.visits < 2))
            {
                return;
            }

            ++node.visits;
            
            if (node.id == endId)
            {
                const newPath = [...path, node.id];
                //if (!checkIfPathAlreadyFound(newPath))
                //{
                    this.paths.push(newPath);
                //}
                --node.visits;
                return;
            }

            for (let i = 0; i < node.connections.length; ++i)
            {
                visit(node.connections[i].node, [...path, node.id]);
            }

            --node.visits;
        };

        this.clear();

        for (let id in this.graph.nodes)
        {
            const node = this.graph.nodes[id];

            // The nodes with id startId or endId cannot be visited twice and big "caves" can be visited multiple times already.
            if (node.canReenter || node.id == startId || node.id == endId)
            {
                continue;
            }

            node.canVisitTwice = true;
            visit(this.graph.nodes[startId]);
            delete node.canVisitTwice;
        }

        const uniquePaths = {};
        for (let i = 0; i < this.paths.length; ++i)
        {
            let value = this.paths[i];
            let key = value.join(',');
            uniquePaths[key] = value;
        }
        this.paths = Object.values(uniquePaths);
    }

    clear()
    {
        this.paths = [];
    }
}