def clearBoard(board):
    for i in range(len(board)):
        newRow = [(num, False) for num, _ in board[i]]
        board[i] = newRow

def markBoard(board, chosenNum):
    for i in range(len(board)):
        newRow = [(num, True if num == chosenNum else isChosen ) for num, isChosen in board[i]]
        board[i] = newRow

def checkRow(board, rowIndex):
    return sum([int(isChosen) for num, isChosen in board[rowIndex]]) == 5

def checkCol(board, colIndex):
    return sum([int(row[colIndex][1]) for row in board]) == 5

def checkBoard(board):
    for i in range(5):
        if checkRow(board, i) or checkCol(board, i):
            return True
    return False

def getSumUnmarked(board):
    return sum([sum([num for num, isMarked in row if not isMarked]) for row in board])

if __name__ == "__main__":
    with open("input", "r") as fileHandle:

        lines = [line for line in fileHandle.read().strip().split('\n') if not line.isspace() and line != ""]

        """lines = [line for line in
'''
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7'''.strip().split('\n') if not line.isspace() and line != ""]"""


        bingoNumbers = list(map(lambda x: int(x), lines[0].split(",")))
        bingoBoards = []
        for i in range(1, len(lines), 5):
            bingoBoard = list(map(lambda x: [(int(y), False) for y in x.split()], lines[i:(i+5)]))
            bingoBoards.append(bingoBoard)

    # Part 1
    winningBoard = None
    winningNumber = None

    for num in bingoNumbers:
        for board in bingoBoards:
            markBoard(board, num)

            if checkBoard(board):
                winningBoard = board
                winningNumber = num
                break
        if winningBoard is not None:
            break

    if winningBoard is not None:
        sumUnmarked = getSumUnmarked(winningBoard)
        key = sumUnmarked * winningNumber
        print("Part 1:", key)

    for board in bingoBoards:
        clearBoard(board)

    winningBoards = []
    losingBoard = None
    losingNumber = None

    for num in bingoNumbers:
        winningBoardsThisRound = []
        for board in bingoBoards:
            markBoard(board, num)

            if board not in winningBoards and checkBoard(board):
                winningBoards.append(board)

                if len(winningBoards) == len(bingoBoards):  # This was the last board to win.
                    losingBoard = board
                    losingNumber = num
                    break
        if losingBoard is not None:
            break

    if losingBoard is not None:
        sumUnmarked = getSumUnmarked(losingBoard)
        key = sumUnmarked * losingNumber
        print("Part 2:", key)

