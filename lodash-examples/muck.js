var input = [['.','.','.'],['.','.','.'],['.','.','.']]

var isEmpty = (arr) => arr.filter(el => el !== '.').length === 0

let output = input.map(arr => isEmpty(arr))
let result = output.every((el) => el )
result