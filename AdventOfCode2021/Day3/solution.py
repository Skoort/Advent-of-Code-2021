from collections import Counter


def find_desired(binaryStrings, keepMostCommon, bitOffset = 0):
    length = len(binaryStrings)

    if length == 1:
        return binaryStrings[0]

    bitValues = Counter(binary[bitOffset] for binary in binaryStrings).most_common()

    if bitValues[0][1] == bitValues[1][1]:
        requiredBitValue = '1' if keepMostCommon else '0'
    elif keepMostCommon:
        requiredBitValue = bitValues[0][0]
    else:
        requiredBitValue = bitValues[1][0]

    narrowedBinaryStrings = [x for x in binaryStrings if x[bitOffset] == requiredBitValue]

    return find_desired(narrowedBinaryStrings, keepMostCommon, bitOffset + 1)


if __name__ == "__main__":

    with open("input", "r") as fileHandle:
        binaryStrings = fileHandle.read().strip().split()

    # Part 1
    gammaRateBinary = "".join(map(lambda x: Counter(x).most_common()[0][0], zip(*binaryStrings)))
    epsilonRateBinary = "".join("0" if x == "1" else "1" for x in gammaRateBinary)

    powerConsumption = int(gammaRateBinary, 2) * int(epsilonRateBinary, 2)

    print("Part 1:", powerConsumption)

    # Part 2

    '''binaryStrings = \
"""
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
""".strip().split()'''

    oxygenGeneratorRating = find_desired(binaryStrings, keepMostCommon=True)
    co2ScrubberRating = find_desired(binaryStrings, keepMostCommon=False)

    lifeSupportRating = int(oxygenGeneratorRating, 2) * int(co2ScrubberRating, 2)

    print("Part 2:", lifeSupportRating)
