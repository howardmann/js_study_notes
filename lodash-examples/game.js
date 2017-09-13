// Some code we inherited that we will want to refactor HAHAHAH

var Game = {
  newBoard: function (n) {
    // Creates a new board of n x n filled with marker '.'
    this.board = this.board || Array(n);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = Array(n).fill('.');
    }
    // Reset game finish as false and selected player as undefined
    this.finish = false;
    this.lastPlayer = 'undefined';
    // console.log("newBoard created: " + n + " by " + n);
  },
  winCount: function (n) {
    this.countWin = n;
    // console.log("Game of connect " + n);
  },
  addMark: function (playerChosen, row, col) {
    if (playerChosen === this.lastPlayer) {
      // console.log("Not your turn");
    } else if (this.board[row][col] === '.') {
      this.board[row][col] = playerChosen;
      this["lastPlayer"] = playerChosen;
      // console.log("Player: " + playerChosen + " addMark to row: " + row + ", col: " + col);
    } else {
      // console.log("Already marked. Try again.");
    }
  },
  checkRows: function (playerChosen) {
    for (var row = 0; row < this.board.length; row++) {
      var count = 0;
      this.winArray = [];
      for (var col = 0; col < this.board.length; col++) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("checkRow true on row: " + row);
          this["finish"] = true;
          // console.log("Start", row);
          // console.log("End", col);
          return true;
        }
      }
    }
  },
  checkCols: function (playerChosen) {
    for (var col = 0; col < this.board.length; col++) {
      var count = 0;
      this.winArray = [];
      for (var row = 0; row < this.board.length; row++) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("checkCol true on col " + col);
          this["finish"] = true;
          return true;
        }
      }
    }
  },
  checkDiagLR: function (playerChosen) {
    var length = this.board.length;
    var maxLength = length - this.countWin + 1;
    // Run Bottom Half diagonal Top Left to Bottom Right (incl middle)
    for (var rowStart = 0; rowStart < maxLength; rowStart++) {
      var count = 0;
      this.winArray = [];
      for (var row = rowStart, col = 0; row < length && col < length; row++ , col++) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("Win diagonal TL to BR");
          this["finish"] = true;
          return true;
        }
      }
    }
    // Run Top Half diagonal Top Left to Bottom Right (excl middle)
    for (var colStart = 1; colStart < maxLength; colStart++) {
      var count = 0;
      this.winArray = [];
      for (var col = colStart, row = 0; col < length && row < length; col++ , row++) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("Win diagonal TL to BR");
          this["finish"] = true;
          return true;
        }
      }
    }
  },
  checkDiagRL: function (playerChosen) {
    var length = this.board.length;
    var maxLength = length - this.countWin + 1;
    // Run Bottom half diagonal Top Right to Botom Left (incl middle)

    for (var rowStart = 0; rowStart < maxLength; rowStart++) {
      var count = 0;
      this.winArray = [];
      for (var row = rowStart, col = (length - 1); row < length && col >= 0; (row++  && col--)) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("Win diagonal TR to BL");
          this["finish"] = true;
          return true;
        }
      }
    }
    // Run Top half diagonal Top Right to Botom Left (excl middle)
    for (var colStart = (length - 2); colStart > (this.countWin - 2); colStart--) {
      var count = 0;
      this.winArray = [];
      for (var col = colStart, row = 0; col >= 0 && row <= (length - 2);(col-- && row++)) {
        if (this.board[row][col] === playerChosen) {
          count++;
          this.winArray.push(Array(row, col));
        } else {
          count = 0;
          this.winArray = [];
        }
        if (count === this.countWin) {
          // console.log("Win diagonal TR to BL");
          this["finish"] = true;
          return true;
        }
      }
    }
  },
  isEmpty: function () {
    var board = this.board
    var result = board.map(arr => {
      return arr.filter(el => el !== '.').length === 0
    })
    return result.every(el => el)
  },
  checkAll: function (playerChosen) {
    if (this.checkRows(playerChosen)) {
      return true;
    }
    if (this.checkCols(playerChosen)) {
      return true;
    }
    if (this.checkDiagLR(playerChosen)) {
      return true;
    }
    if (this.checkDiagRL(playerChosen)) {
      return true;
    }
    if (!this.finish && this.isEmpty()) {
      console.log("Draw game no winner");
      return true;
    }
  }
};

module.exports = {
  Game
}