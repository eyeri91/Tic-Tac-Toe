export const GameBoard = (function () {
  const roundCount = 1;
  const areAllCellsAssigned = false;
  const cells = [];
  // by for loops -> name the cell and cell.isEmpty assign;
  // cell1.isEmpty = true;
  // cells.push(cell);
  //
  // checkIfAllCellsAreAssigned () {
  //  return cells.some((cell)=> (cell.isEmpty === true) )
  // }
  // pickCell(pickedCell, player) {
  //  if(!pickedCell.isEmpty)
  //  -> pickedCell.isEmpty = false;
  //  -> assignCell(pickedCell, player.sign);
  // }
  // assignCell(pickedCell, player.sign) {
  //   pickedCell.assignedPlayer = player.sign;
  //  roundCount++;
  //  if(roundCount === 9) checkWinningLine()
  // }
  //
  // checkWinningLine() {
  //    const winningCases = [
  //      [1,2,3],[4,5,6,],[7,8,9],
  //      [1,4,7],[2,5,8],[3,6,9],
  //       [1,5,9],[3,5,7]
  //     ]
  //  for(let case in winningCases){
  // if(case[0].assignedPlayer == case[1].assignedPlayer == case[2].assignedPlayer) {
  //     const winnerSign = case[2].assignedPlayer;
  //     return winnerSign
  //        }
  //    } else return "draw"
  // }
  // announceResults() {
  //  const results = checkingWinningLine();
  //  if(results == x)
  //  elseif(results == 0)
  //  else(results == draw)
  // }

  // return {}
})();
