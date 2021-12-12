const input = '1,5,5,1,5,1,5,3,1,3,2,4,3,4,1,1,3,5,4,4,2,1,2,1,2,1,2,1,5,2,1,5,1,2,2,1,5,5,5,1,1,1,5,1,3,4,5,1,2,2,5,5,3,4,5,4,4,1,4,5,3,4,4,5,2,4,2,2,1,3,4,3,2,3,4,1,4,4,4,5,1,3,4,2,5,4,5,3,1,4,1,1,1,2,4,2,1,5,1,4,5,3,3,4,1,1,4,3,4,1,1,1,5,4,3,5,2,4,1,1,2,3,2,4,4,3,3,5,3,1,4,5,5,4,3,3,5,1,5,3,5,2,5,1,5,5,2,3,3,1,1,2,2,4,3,1,5,1,1,3,1,4,1,2,3,5,5,1,2,3,4,3,4,1,1,5,5,3,3,4,5,1,1,4,1,4,1,3,5,5,1,4,3,1,3,5,5,5,5,5,2,2,1,2,4,1,5,3,3,5,4,5,4,1,5,1,5,1,2,5,4,5,5,3,2,2,2,5,4,4,3,3,1,4,1,2,3,1,5,4,5,3,4,1,1,2,2,1,2,5,1,1,1,5,4,5,2,1,4,4,1,1,3,3,1,3,2,1,5,2,3,4,5,3,5,4,3,1,3,5,5,5,5,2,1,1,4,2,5,1,5,1,3,4,3,5,5,1,4,3';
//const input = '3,4,3,1,2';

let poolFish = input.split(',').map(x => Number.parseInt(x));

function simulate()
{
    let newFish = [];

    for (let i = 0; i < poolFish.length; ++i)
    {
        if (poolFish[i] == 0)
        {
            poolFish[i] = 6;
            newFish.push(8);
        }
        else
        {
            --poolFish[i];
        }
    }

    poolFish = [...poolFish, ...newFish];
}

// PART 1
// console.log('Initial state: ' + poolFish.join());
// for (let day = 0; day < 80; ++day)
// {
//     simulate();
//     if (day % 20 == 0)
//     {
//         console.log(`After ${(day+1).toString().padStart(2, ' ')} days: ` + poolFish.join());   
//     }
// }
// console.log('Part 1: ' + poolFish.length);


// Part 2 requires a different approach. The number of fish after 256 generations will be enormous, so what we must do is store the state as a map instead.
const poolFishMap = [0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < poolFish.length; ++i)
{
    const timeUntilBreed = poolFish[i];
    ++poolFishMap[timeUntilBreed];
}

function simulate2()
{
    const newFishThisTick = poolFishMap[0];

    for (let i = 0; i < poolFishMap.length - 1; ++i)
    {
        poolFishMap[i] = poolFishMap[i + 1];
    }

    poolFishMap[8] = newFishThisTick;  // The new babies
    poolFishMap[6] += newFishThisTick;   // The fish that bred this tick.
}

for (let day = 0; day < 256; ++day)
{
    simulate2();
}

const totalFish = poolFishMap.reduce((a, b) => a + b, 0);

console.log('Part 2: ' + totalFish);
