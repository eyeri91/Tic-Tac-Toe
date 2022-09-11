export const GameBoard = (function () {
  const roundCount = 1;
  const cells = [];
  const winningLine = null;

  const create9Cells = () => {
    for (let i = 0; i < 9; i++) {
      let cell = {};
      cell.id = i;
      cell.isEmpty = true;
      cell.assignedPlayerSign = null;
      cells.push(cell);
    }
  };

  create9Cells();

  function assignCell(
    pickedCellId,
    player
    // grid or cell.id and player will be passed from View)
  ) {
    if (cells[pickedCellId].isEmpty) {
      cells[pickedCellId].isEmpty = false;
      cells[pickedCellId].assignedPlayerSign = player.sign;
      roundCount++;
    }
    if (roundCount === 9) checkWinningLine();
  }

  function checkIfAllCellsAreAssigned() {
    return cells.some((cell) => cell.isEmpty === true);
  }

  // Later if (checkIfAllCellsAreAssigned()) {
  // checkWinningLine(cells) }
  // else -> alert( Game HAsn't finished yet!) in main class

  function checkWinningLine(cells) {
    if (checkIfAllCellsAreAssigned) {
      const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const line in winningLines) {
        if (
          (cells[line[0]].assignedPlayerSign ===
            cells[line[1]].assignedPlayerSign) ===
          cells[line[2]].assignedPlayerSign
        ) {
          winningLine = line;
        }
      }
    } else alert("This game hasn't finished yet!");
  }

  function returnResults() {
    if (winningLine) {
      const winnerSign = winningLine[0].assignedPlayerSign;
      return winnerSign;
    } else {
      return "draw";
    }
  }

  return {
    roundCount,
    cells,
    assignCell,
    checkWinningLine,
    returnResults,
  };
})();
