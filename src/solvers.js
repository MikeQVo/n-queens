/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var newBoard = new Board({ n: n });
  var solution = Object.values(newBoard.attributes).slice(0, -1);

  var numberOfRooks = n;

  var solutionMaker = function(rooksLeft, array) {
    for (var row = 0; row < array.length; row++) {
      for (var col = 0; col < array[row].length; col++) {

        if (array[row][col] !== 1 && !playRooks(array, [row, col])) {
          rooksLeft--;
          if (rooksLeft === 0) {
            return array;
          }
        }
      }
    }
  }

  var playRooks = function(array, moveToMake){
    array[moveToMake[0]][moveToMake[1]] = 1;
    if(!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts()){
      return false; //there is no conflict
    } else {
      array[moveToMake[0]][moveToMake[1]] = 0;
      return true;//there IS a conflict
    }
    // console.log('array BEFORE solution', array);
  };
  solution = solutionMaker(numberOfRooks, solution);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //declare a result variable that keeps count of the number of solutions
  var count = 0;
  // create a new game board that takes in the value n to create a board
  var newBoard = new Board({n:n});

  //declare a recursive function
  var playedBoard = function(row) {

    //basecase to exit the recursion;
    if (row === n) {
      count++;
      return;
    }

    //creating an iteration from 0 to n checking each box in the board
    for (var i = 0; i < n; i++) {
      //add queen to square
      newBoard.togglePiece(row, i);
      //check to see if there is a conflict
      if (!newBoard.hasAnyRooksConflicts()) {
        //if there is not a conflict make the recursive call of playedBoard
        playedBoard(row + 1)
      }
      //if there is a conflict toggle the piece back out
      newBoard.togglePiece(row, i);
    }

  }
  //invoke the recursive function
  playedBoard(0);

  return count;
}
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});

  var solution = findSolution(n, 0, 'hasAnyQueensConflicts', board, function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    });
  }) || board.rows();

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  findSolution(n, 0, 'hasAnyQueensConflicts', board, function() {
    solutionCount++;
  });

  return solutionCount;
};

window.findSolution = function(n, row, checkerFunction, board, callback){ //universal solution creator

  if(row === n){
    return callback();
  }
  for(var col = 0; col < n; col++){
    board.togglePiece(row, col);
    if( !board[checkerFunction]() ){
      var solution = findSolution(n, row + 1, checkerFunction, board, callback);
      if(solution){
        return solution;
      }
    }

    board.togglePiece(row, col);
  }
};