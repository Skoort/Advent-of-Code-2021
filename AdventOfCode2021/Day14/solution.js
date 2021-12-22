let input = `
KHSSCSKKCPFKPPBBOKVF

OS -> N
KO -> O
SK -> B
NV -> N
SH -> V
OB -> V
HH -> F
HP -> H
BP -> O
HS -> K
SN -> B
PS -> C
BS -> K
CF -> H
SO -> C
NO -> H
PP -> H
SS -> P
KV -> B
KN -> V
CC -> S
HK -> H
FN -> C
OO -> K
CH -> H
CP -> V
HB -> N
VC -> S
SP -> F
BO -> F
SF -> H
VO -> B
FF -> P
CN -> O
NP -> H
KK -> N
OP -> S
BH -> F
CB -> V
HC -> P
KH -> V
OV -> V
NK -> S
PN -> F
VV -> N
HO -> S
KS -> C
FP -> F
FH -> F
BB -> C
FB -> V
SB -> K
KP -> B
FS -> C
KC -> P
SC -> C
VF -> F
VN -> B
CK -> C
KF -> H
NS -> C
FV -> K
HV -> B
HF -> K
ON -> S
CV -> N
BV -> F
NB -> N
NN -> F
BF -> N
VB -> V
VS -> K
BK -> V
VP -> P
PB -> F
KB -> C
VK -> O
NF -> F
FO -> F
PH -> N
VH -> B
HN -> B
FK -> K
PO -> H
CO -> B
FC -> V
OK -> F
OF -> V
PF -> F
BC -> B
BN -> O
NC -> K
SV -> H
OH -> B
PC -> O
OC -> C
CS -> P
PV -> V
NH -> C
PK -> H
`;

// input = `
// NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`;


let lines = input.split('\n').filter(x => x !== '');

const initialPolymer = lines[0];
const mappings = new Map(lines.slice(1).map(x => {
    return x.split('->').map(y => y.trim());
}));

// PART 1
function mapOnce(polymer)
{
    let modifiedPolymer = '';
    for (let i = 0; i < polymer.length; ++i)
    {
        let combo = polymer.slice(i, i+2);
        modifiedPolymer += combo[0];
        if (mappings.has(combo))
        {
            modifiedPolymer += mappings.get(combo);
        }
    }
    return modifiedPolymer;
}

console.log('Template:', initialPolymer.length, initialPolymer);
let polymer = initialPolymer;
for (let i = 1; i <= 40; ++i)
{
    polymer = mapOnce(polymer);
    //console.log(`After step ${i+1}:`, polymer.length, polymer);
}

const counts = {};
for (let i = 0; i < polymer.length; ++i)
{
    if (counts[polymer[i]] === undefined)
    {
        counts[polymer[i]] = 0;
    }
    ++counts[polymer[i]]; 
}

console.log(counts);

let minSymbolInfo = { symbol: null, amount: Number.MAX_VALUE };
let maxSymbolInfo = { symbol: null, amount: Number.MIN_VALUE };
for (let [symbol, amount] of Object.entries(counts))
{
    if (minSymbolInfo.amount > amount)
    {
        minSymbolInfo.symbol = symbol;
        minSymbolInfo.amount = amount;
    }
    if (maxSymbolInfo.amount < amount)
    {
        maxSymbolInfo.symbol = symbol;
        maxSymbolInfo.amount = amount;
    }
}

console.log()

console.log('Part 1:', maxSymbolInfo.amount - minSymbolInfo.amount);