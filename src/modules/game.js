import { Player } from "./player.js";

export const GameBoard = function (
  publishAnnounceActivePlayerEvent,
  publishCellAssignedEvent,
  publishToggleActivePlayerEvent,
  publishGameEndEvent
) {
  let roundCount = 0;
  const cells = [];
  let winningLine = null;
  const players = [];
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

  const create9Cells = () => {
    for (let i = 0; i < 9; i++) {
      let cell = {};
      cell.id = i;
      cell.isEmpty = true;
      cell.assignedPlayerSign = null;
      cell.assignedPlayer = null;
      cells.push(cell);
    }
  };

  create9Cells();

  function assignPlayers(assignedSigns) {
    const player1 = Player("user", assignedSigns[0], true);
    const player2 = Player("oponent", assignedSigns[1], false);
    players.push(player1, player2);
    publishAnnounceActivePlayerEvent(player1);
  }

  function assignCell(pickedCellId) {
    const pickedCell = cells.find((cell) => cell.id === parseInt(pickedCellId));
    const activePlayer = players[0].isCurrentlyPlaying
      ? players[0]
      : players[1];
    if (pickedCell.isEmpty) {
      pickedCell.isEmpty = false;
      pickedCell.assignedPlayerSign = activePlayer.sign;
      pickedCell.assignedPlayer = activePlayer.name;
      roundCount++;
      toggleActivePlayer();
      const pickedCellObject = {
        id: pickedCell.id,
        owner: activePlayer,
        sign: activePlayer.sign,
      };
      publishCellAssignedEvent(pickedCellObject);
    }
    if (roundCount >= 5) checkWinningLine(cells);
  }

  function toggleActivePlayer() {
    players[0].isCurrentlyPlaying = !players[0].isCurrentlyPlaying;
    players[1].isCurrentlyPlaying = !players[1].isCurrentlyPlaying;

    players[0].isCurrentlyPlaying
      ? publishToggleActivePlayerEvent(players[0])
      : publishToggleActivePlayerEvent(players[1]);
  }

  function checkWinningLine(cells) {
    for (const line of winningLines) {
      let firstCell = cells.find((cell) => cell.id === line[0]);
      let secondCell = cells.find((cell) => cell.id === line[1]);
      let thirdCell = cells.find((cell) => cell.id === line[2]);

      if (
        firstCell.assignedPlayerSign !== null &&
        firstCell.assignedPlayerSign === secondCell.assignedPlayerSign &&
        firstCell.assignedPlayerSign === thirdCell.assignedPlayerSign
      ) {
        winningLine = line;
        releaseGameResults(winningLine);
        break;
      }
    }
    if (roundCount === 9 && winningLine === null) {
      releaseGameResults(winningLine);
    }
  }

  function releaseGameResults() {
    if (winningLine) {
      const winnerData = {
        winner: cells[winningLine[0]].assignedPlayer,
        sign: cells[winningLine[0]].assignedPlayerSign,
        winningLine,
      };
      publishGameEndEvent(winnerData);
    } else {
      publishGameEndEvent("draw");
    }
  }

  return {
    assignPlayers,
    assignCell,
    checkWinningLine,
  };
};
