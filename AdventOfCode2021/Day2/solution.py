if __name__ == "__main__":
    with open("input", "r") as fileHandle:
        instructions = fileHandle.read().strip().split("\n")

    # Part 1
    position = [0, 0]

    for move_command, move_amount_str in map(lambda x: x.split(), instructions):
        move_amount = int(move_amount_str)
        if move_command == "forward":
            position[0] = position[0] + move_amount
        elif move_command == "up":
            position[1] = position[1] - move_amount  # y measures depth, not height.
        elif move_command == "down":
            position[1] = position[1] + move_amount
        else:
            print("ERROR: Unknown move_command", move_command)

    print("Solution for art 1:", position[0] * position[1])

    # Part 2

    x = 0
    depth = 0
    aim = 0

    for command, command_param_str in map(lambda x: x.split(), instructions):
        command_param = int(command_param_str)
        if command == "forward":
            x = x + command_param
            depth = depth + command_param * aim
        elif command == "up":
            aim = aim - command_param   # y measures depth, not height.
        elif command == "down":
            aim = aim + command_param
        else:
            print("ERROR: Unknown move_command", move_command)

    print("Solution for part 1:", x * depth)
