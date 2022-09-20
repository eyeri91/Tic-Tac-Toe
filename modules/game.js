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

  function assignCell(pickedCellId, playerData) {
    if (cells[pickedCellId].isEmpty) {
      cells[pickedCellId].isEmpty = false;
      cells[pickedCellId].assignedPlayerSign = playerData.sign;
      roundCount++;
    }
    if (roundCount === 9) checkWinningLine();
  }

  function checkIfAllCellsAreAssigned() {
    if (cells.some((cell) => cell.isEmpty === true)) return false;
    return true;
  }

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
      const winnerData = {
        winnerSign: winningLine[0].assignedPlayerSign,
        winningLine: winningLine,
      };
      return winnerData;
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
