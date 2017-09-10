let expect = require('chai').expect
let {Game} = require('../game')

describe("#Game", () => {
  it('should exist', () => expect(Game).to.not.be.undefined)
  beforeEach('set up 3x3 board', () => {
    Game.newBoard(3)
  })
  afterEach('tear down board', () => {
    Game.board = undefined
  })
  describe('.newBoard', () => {
    it('should exist', () => expect(Game.newBoard).to.not.be.undefined)
    it('creates a new Board of n x n filled with marker . and stores it to the Game.board property', () => {
      let input = Game.board 
      let actual = [['.','.','.'],['.','.','.'],['.','.','.']]
      expect(input).to.eql(actual)
    })
    it('sets .finish as false', () => {
      let input = Game.finish
      expect(input).to.be.false
    })
    it('sets .lastPlauer as "undefined"', () => {
      let input = Game.lastPlayer
      let actual = "undefined"
      expect(input).to.equal(actual)
    })
    it('does not handle invalid params', () => {
      Game.board = undefined
      Game.newBoard('banana')
      let {board, finish, lastPlayer} = Game
      expect(board).to.eql([['.']])
      expect(finish).to.be.false
      expect(lastPlayer).to.equal("undefined")
    })
  })
  describe('.winCount', () => {
    it('should exist', () => expect(Game.winCount).to.not.be.undefined)
    it('should set the initial win count paramater', () => {
      Game.winCount(2)
      let input = Game.countWin
      let actual = 2
      expect(input).to.equal(actual)
    })
  })
  describe('.addMark', () => {
    let markedRow
    let markedCol
    let playerOne

    beforeEach('mark the board', () => {
      markedRow = 1
      markedCol = 2
      playerOne = 'howie'
      Game.addMark(playerOne, markedRow, markedCol)
    })

    it('should exist', () => expect(Game.addMark).to.not.be.undefined)
    it('should replace the board marker with the playerChosen name if it is not taken', () => {
      let input = Game.board[markedRow][markedCol]
      let actual = playerOne
      expect(input).to.equal(actual)
    })
    it('should set lastPlayer to the playerChosen who last made a move', () => {
      let input = Game.lastPlayer
      let actual = playerOne
      expect(input).to.equal(actual)
    })
    it('should not let a player mark again if they went last', () => {
      let newMarkedRow = 2
      let newMarkedCol = 2
      Game.addMark(playerOne, newMarkedRow, newMarkedCol)
      let input = Game.board[newMarkedRow][newMarkedCol]
      let actual = '.'
      expect(input).to.equal(actual)
    })
    it('should not let a player mark a spot already marked', () => {
      let playerTwo = 'felix'
      Game.addMark(playerTwo, markedRow, markedCol)
      let input = Game.board[markedRow][markedCol]
      let actual = playerOne
      expect(input).to.equal(actual)      
    })
    
  })
  describe('.checkRows', () => {
    let playerOne = 'howie'
    let playerTwo = 'felix'    
    it('should exist', () => expect(Game.checkRows).to.not.be.undefined)
    describe('for winning playerOne row combination based on 3x3 board and 3 win combo', () => {
      beforeEach('set up winning row between 2 players', () => {
        // Win 3 in a row
        Game.winCount(3)
        playerOne = 'howie'
        playerTwo = 'felix'
        // playerOne wins top row
        Game.addMark(playerOne, 0, 0)
        Game.addMark(playerTwo, 1, 0)
        Game.addMark(playerOne, 0, 1)
        Game.addMark(playerTwo, 1, 1)
        Game.addMark(playerOne, 0, 2)
      })
      it('should return true if the playerChosen has marked all rows', () => {
        let input = Game.checkRows(playerOne)
        expect(input).to.be.true
      })
      it('should set Game.finish as true', () => {
        Game.checkRows(playerOne)
        let input = Game.finish
        expect(input).to.be.true
      })
      it('should store the winning coordinates in Game.winArray', () => {
        Game.checkRows(playerOne)
        let input = Game.winArray
        let actual = [[0,0],[0,1],[0,2]]
        expect(input).to.eql(actual)
      })
    })
    describe('for incomplete row combination based on 3x3 board and 3 win combo', () => {
      beforeEach('set up non-winning row combo between 2 players', () => {
        // Win 3 in a row
        Game.winCount(3)
        playerOne = 'howie'
        playerTwo = 'felix'
        // No winner
        Game.addMark(playerOne, 0, 0)
        Game.addMark(playerTwo, 1, 0)
        Game.addMark(playerOne, 0, 1)
        Game.addMark(playerTwo, 1, 1)
      })
      it('should return undefined if the playerChosen has not marked all rows', () => {
        let input = Game.checkRows(playerOne)
        // FIX: should return false
        expect(input).to.be.undefined
      })
      it('should keep Game.finish set as false', () => {
        Game.checkRows(playerOne)
        let input = Game.finish
        expect(input).to.be.false
      })
      it('should empty the winning coordinates in Game.winArray', () => {
        Game.checkRows(playerOne)
        let input = Game.winArray
        let actual = []
        expect(input).to.eql(actual)
      })
    })    
  })
  describe('.checkCols', () => {
    let playerOne = 'howie'
    let playerTwo = 'felix'    
    it('should exist', () => expect(Game.checkCols).to.not.be.undefined)
    describe('for winning playerOne Col combination based on 3x3 board and 3 win combo', () => {
      beforeEach('set up non-winning combo between 2 players', () => {
        // Win 3 in a Col
        Game.winCount(3)
        playerOne = 'howie'
        playerTwo = 'felix'
        // playerOne wins top Col
        Game.addMark(playerOne, 0, 0)
        Game.addMark(playerTwo, 0, 1)
        Game.addMark(playerOne, 1, 0)
        Game.addMark(playerTwo, 2, 1)
        Game.addMark(playerOne, 2, 0)
      })
      it('should return true if the playerChosen has marked all Cols', () => {
        let input = Game.checkCols(playerOne)
        expect(input).to.be.true
      })
      it('should set Game.finish as true', () => {
        Game.checkCols(playerOne)
        let input = Game.finish
        expect(input).to.be.true
      })
      it('should store the winning coordinates in Game.winArray', () => {
        Game.checkCols(playerOne)
        let input = Game.winArray
        let actual = [[0,0],[1,0],[2,0]]
        expect(input).to.eql(actual)
      })
    })
    describe('for incomplete Col combination based on 3x3 board and 3 win combo', () => {
      beforeEach('set up winning Col between 2 players', () => {
        // Win 3 in a Col
        Game.winCount(3)
        playerOne = 'howie'
        playerTwo = 'felix'
        // No winner
        Game.addMark(playerOne, 0, 0)
        Game.addMark(playerTwo, 0, 1)
        Game.addMark(playerOne, 1, 0)
        Game.addMark(playerTwo, 2, 1)
      })
      it('should return undefined if the playerChosen has not marked all Cols', () => {
        let input = Game.checkCols(playerOne)
        // FIX: should return false
        expect(input).to.be.undefined
      })
      it('should keep Game.finish set as false', () => {
        Game.checkCols(playerOne)
        let input = Game.finish
        expect(input).to.be.false
      })
      it('should empty the winning coordinates in Game.winArray', () => {
        Game.checkCols(playerOne)
        let input = Game.winArray
        let actual = []
        expect(input).to.eql(actual)
      })
    })
    
  })
  describe('.checkDiagLR', () => {
    beforeEach('setup 5x5 board with 3 win combo', () => {
      Game.board = undefined
      Game.newBoard(5)
      Game.winCount(3)
    })
    afterEach('tear down board', () => {
      Game.board = undefined
    })
    let playerOne = 'howie'
    let playerTwo = 'felix'    
    it('should exist', () => expect(Game.checkDiagLR).to.not.be.undefined)
    describe('for bottom half diagonal LR', () => {
      describe('for winning playerOne Diagonal LR combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up winning Col between 2 players', () => {
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal
          Game.addMark(playerOne, 0, 0)
          Game.addMark(playerTwo, 0, 1)
          Game.addMark(playerOne, 1, 1)
          Game.addMark(playerTwo, 2, 1)
          Game.addMark(playerOne, 2, 2)
        })
        it('should return true if the playerChosen has marked all diagonals', () => {
          let input = Game.checkDiagLR(playerOne)
          expect(input).to.be.true
        })
        it('should set Game.finish as true', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.finish
          expect(input).to.be.true
        })
        it('should store the winning coordinates in Game.winArray', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.winArray
          let actual = [[0, 0], [1, 1], [2, 2]]
          expect(input).to.eql(actual)
        })
      })
      describe('for incomplete Diagonal LR combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up non-winning combo between 2 players', () => {
          // Win 3 in a Col
          Game.winCount(3)
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal
          Game.addMark(playerOne, 0, 0)
          Game.addMark(playerTwo, 0, 1)
          Game.addMark(playerOne, 1, 1)
          Game.addMark(playerTwo, 2, 1)
        })
        it('should return undefined if the playerChosen has not marked all diagonals', () => {
          let input = Game.checkDiagLR(playerOne)
          // FIX: should return false
          expect(input).to.be.undefined
        })
        it('should keep Game.finish set as false', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.finish
          expect(input).to.be.false
        })
        it('should empty the winning coordinates in Game.winArray', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.winArray
          let actual = []
          expect(input).to.eql(actual)
        })
      })
    })
    describe('for top half diagonal LR', () => {
      describe('for winning playerOne Diagonal LR combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up winning Col between 2 players', () => {
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal
          Game.addMark(playerOne, 0, 1)
          Game.addMark(playerTwo, 1, 0)
          Game.addMark(playerOne, 1, 2)
          Game.addMark(playerTwo, 2, 1)
          Game.addMark(playerOne, 2, 3)
        })
        it('should return true if the playerChosen has marked all diagonals', () => {
          let input = Game.checkDiagLR(playerOne)
          expect(input).to.be.true
        })
        it('should set Game.finish as true', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.finish
          expect(input).to.be.true
        })
        it('should store the winning coordinates in Game.winArray', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.winArray
          let actual = [[0, 1], [1, 2], [2, 3]]
          expect(input).to.eql(actual)
        })
      })
      describe('for incomplete Diagonal LR combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up non-winning combo between 2 players', () => {
          // Win 3 in a Col
          Game.winCount(3)
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal
          Game.addMark(playerOne, 0, 1)
          Game.addMark(playerTwo, 1, 0)
          Game.addMark(playerOne, 1, 2)
          Game.addMark(playerTwo, 2, 1)
        })
        it('should return undefined if the playerChosen has not marked all diagonals', () => {
          let input = Game.checkDiagLR(playerOne)
          // FIX: should return false
          expect(input).to.be.undefined
        })
        it('should keep Game.finish set as false', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.finish
          expect(input).to.be.false
        })
        it('should empty the winning coordinates in Game.winArray', () => {
          Game.checkDiagLR(playerOne)
          let input = Game.winArray
          let actual = []
          expect(input).to.eql(actual)
        })
      })
    })
    
  })
  describe('.checkDiagRL', () => {
    beforeEach('setup 5x5 board with 3 win combo', () => {
      Game.board = undefined
      Game.newBoard(5)
      Game.winCount(3)
    })
    afterEach('tear down board', () => {
      Game.board = undefined
    })
    let playerOne = 'howie'
    let playerTwo = 'felix'    
    it('should exist', () => expect(Game.checkDiagRL).to.not.be.undefined)
    describe('for bottom half diagonal RL', () => {
      describe('for winning playerOne Diagonal RL combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up winning combo between 2 players', () => {
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal RL
          Game.addMark(playerOne, 0, 3)
          Game.addMark(playerTwo, 1, 1)
          Game.addMark(playerOne, 1, 2)
          Game.addMark(playerTwo, 3, 3)
          Game.addMark(playerOne, 2, 1)
        })
        it('should return true if the playerChosen has marked all diagonals', () => {
          let input = Game.checkDiagRL(playerOne)
          expect(input).to.be.true
        })
        it('should set Game.finish as true', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.finish
          expect(input).to.be.true
        })
        it('should store the winning coordinates in Game.winArray', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.winArray
          let actual = [[0, 3], [1, 2], [2, 1]]
          expect(input).to.eql(actual)
        })
      })
      describe('for incomplete Diagonal LR combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up non-winning combo between 2 players', () => {
          // Win 3 in a Col
          Game.winCount(3)
          playerOne = 'howie'
          playerTwo = 'felix'
          // No winner
          Game.addMark(playerOne, 0, 3)
          Game.addMark(playerTwo, 1, 1)
          Game.addMark(playerOne, 1, 2)
          Game.addMark(playerTwo, 3, 3)
        })
        it('should return undefined if the playerChosen has not marked all diagonals', () => {
          let input = Game.checkDiagRL(playerOne)
          // FIX: should return false
          expect(input).to.be.undefined
        })
        it('should keep Game.finish set as false', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.finish
          expect(input).to.be.false
        })
        it('should empty the winning coordinates in Game.winArray', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.winArray
          let actual = []
          expect(input).to.eql(actual)
        })
      })
    })
    describe('for top half diagonal RL', () => {
      describe('for winning playerOne Diagonal RL combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up winning combo between 2 players', () => {
          playerOne = 'howie'
          playerTwo = 'felix'
          // playerOne wins diagonal
          Game.addMark(playerOne, 2, 0)
          Game.addMark(playerTwo, 1, 0)
          Game.addMark(playerOne, 1, 1)
          Game.addMark(playerTwo, 2, 1)
          Game.addMark(playerOne, 0, 2)
        })
        it('should return true if the playerChosen has marked all diagonals', () => {
          let input = Game.checkDiagRL(playerOne)
          expect(input).to.be.true
        })
        it('should set Game.finish as true', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.finish
          expect(input).to.be.true
        })
        it('should store the winning coordinates in Game.winArray', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.winArray
          let actual = [[0, 2], [1, 1], [2, 0]]
          expect(input).to.eql(actual)
        })
      })
      describe('for incomplete Diagonal RL combination based on 5x5 board and 3 win combo', () => {
        beforeEach('set up non-winning combo between 2 players', () => {
          // Win 3 in a Col
          playerOne = 'howie'
          playerTwo = 'felix'
          // No winner
          Game.addMark(playerOne, 2, 0)
          Game.addMark(playerTwo, 1, 0)
          Game.addMark(playerOne, 1, 1)
          Game.addMark(playerTwo, 2, 1)
          Game.addMark(playerOne, 3, 3)
          Game.addMark(playerTwo, 0, 2)
        })
        it('should return undefined if the playerChosen has not marked all diagonals', () => {
          let input = Game.checkDiagRL(playerOne)
          // FIX: should return false
          expect(input).to.be.undefined
        })
        it('should keep Game.finish set as false', () => {
          Game.checkDiagRL(playerOne)
          let input = Game.finish
          expect(input).to.be.false
        })
        it('should empty the winning coordinates')
      })
    })
    
  })
})


