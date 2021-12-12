export class AutomataBoard
{
    constructor(map)
    {
        this.map = map.map(row => row.map(x => { return { energy: x, didFlash: false }; }));
        
        this.width = this.map[0].length;
        this.height = this.map.length;

        this.totalFlashCount = 0;
        this.flashesThisStep = 0;
    }

    simulateStep()
    {
        this.flashesThisStep = 0;

        function lightUp(self, pos)
        {
            let chainReactionPositions = [];

            self.map[pos.y][pos.x].didFlash = true;

            ++self.totalFlashCount;
            ++self.flashesThisStep;

            for (let yOffset = -1; yOffset <= +1; ++yOffset)
            {
                for (let xOffset = -1; xOffset <= +1; ++xOffset)
                {
                    const y = pos.y + yOffset;
                    const x = pos.x + xOffset;
                    if (x < 0 || y < 0 || x > self.width - 1 || y > self.height - 1)
                    {
                        continue;
                    }

                    const cell = self.map[y][x];
                    if (cell.energy < 10)
                    {
                        ++cell.energy;

                        if (cell.energy == 10)
                        {
                            chainReactionPositions.push({ x: x, y: y });
                        }
                    }
                }
            }

            for (let i = 0; i < chainReactionPositions.length; ++i)
            {
                lightUp(self, chainReactionPositions[i]);
            }
        }

        // Increase the energy level of each octopus by 1. If its energy level exceeds 9, make it flash.
        for (let y = 0; y < this.height; ++y)
        {
            for (let x = 0; x < this.width; ++x)
            {
                const cell = this.map[y][x];

                ++cell.energy;
                if (cell.energy > 9 && !cell.didFlash)
                {
                    lightUp(this, { x: x, y: y });
                }
            }
        }

        // Reset every octopus that flashed this step.
        for (let y = 0; y < this.height; ++y)
        {
            for (let x = 0; x < this.width; ++x)
            {
                if (this.map[y][x].didFlash)
                {
                    this.map[y][x].energy = 0;
                    this.map[y][x].didFlash = false;
                }
            }
        }
    }
}