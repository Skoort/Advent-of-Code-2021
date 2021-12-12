if __name__ == "__main__":
    with open("input", "r") as fileHandle:
        depths = list(map(lambda x: int(x), fileHandle.read().split("\n")))

    # Part 1
    deltas = [0 if i == 0 else depths[i] - depths[i - 1] for i in range(len(depths))]

    num_increases = len([x for x in deltas if x > 0])

    print("Solution for part 1:", num_increases)

    # Part 2
    windows = [tuple(depths[i:i+3]) for i in range(len(depths))]  # The last tuple only has one element.

    deltas2 = [0 if i == 0 else sum(windows[i]) - sum(windows[i - 1]) for i in range(len(windows))]

    num_increases2 = len([x for x in deltas2 if x > 0])

    print("Solution for part 2:", num_increases2)
