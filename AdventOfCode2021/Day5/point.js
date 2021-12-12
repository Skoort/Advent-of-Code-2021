export class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    get magnitude()
    {
        return Math.sqrt(x**2 + y**2); 
    }

    plus(other)
    {
        return new Point(this.x + other.x, this.y + other.y);
    }

    minus(other)
    {
        return new Point(this.x - other.x, this.y - other.y);
    }

    roundToInt()
    {
        return new Point(Math.round(this.x), Math.round(this.y));
    }

    static distance(point1, point2)
    {
        return Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
    }

    static lerp(point1, point2, t)
    {
        const x2 = point1.x * t + point2.x * (1 - t);
        const y2 = point1.y * t + point2.y * (1 - t);
        return new Point(x2, y2);
    }
}
