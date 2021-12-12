import { AutomataBoard } from './automataBoard.js';

let input = `
3265255276
1537412665
7335746422
6426325658
3854434364
8717377486
4522286326
6337772845
8824387665
6351586484`;
// Uncomment for testing.
// input = `
// 5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`;


function createElement(tag, text = null)
{
    const element = document.createElement(tag);
    if (text != null)
    {
        element.appendChild(document.createTextNode(text));
    }
    document.body.append(element);

    return element;
}

function appendLineBreak(section)
{
    const lineBreak = document.createElement('br');
    section.appendChild(lineBreak);
}

function appendText(section, text, shouldBreak = true)
{
    section.appendChild(document.createTextNode(text));

    if (shouldBreak)
    {
        appendLineBreak(section);
    }
}

function appendTextLines(section, lines)
{
    for (let i = 0; i < lines.length; ++i)
    {
        section.insertAdjacentHTML('beforeend', lines[i]);
        appendLineBreak(section);
    }
}

const map = input.trim().split('\n').map(row => Array.from(row).map(x => Number.parseInt(x)));

const board = new AutomataBoard(map);

createElement('H1', 'Advent of Code 2021, Day 11');

let paragraph = createElement('p');
appendText(paragraph, 'Before any steps:');
appendTextLines(paragraph, board.map.map(row => row.map(x => x.energy.toString()).join('')));
appendLineBreak(paragraph);

let firstFlashStep = null;

for (let i = 1; i <= 100; ++i)
{
    board.simulateStep();

    paragraph = createElement('p');
    appendText(paragraph, `After step ${i}:`);
    appendTextLines(paragraph, board.map.map(row => row.map(x => x.energy == 0 ? `<b style = 'color: red'>${x.energy}</b>` : x.energy).join('')));
    appendLineBreak(paragraph);

    if (board.flashesThisStep == board.width * board.height)
    {
        appendText(paragraph, 'All of the octopuses flashed!');
        if (firstFlashStep == null)
        {
            firstFlashStep = i;
        }
    }
}

appendText(createElement('p'), `Total flashes: ${board.totalFlashCount}`);
if (firstFlashStep == null)
{
    appendText(createElement('p'), `The octopuses haven't flashed all at once yet. Try increasing the number of iterations.`);
}
else
{    
    appendText(createElement('p'), `The first time all of the octopuses flashed at once was on turn ${firstFlashStep}.`);
}
