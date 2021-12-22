export class Node
{
    constructor(id, canReenter = false)
    {
        this.id = id;
        this.connections = [];
        this.canReenter = canReenter;
        this.visits = 0;
    }
}