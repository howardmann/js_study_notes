let expect = require('chai').expect
let {Game} = require('../game')

describe("#Game", () => {
  it('should exist', () => expect(Game).to.not.be.undefined)
  beforeEach('set up board', () => {
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
})

