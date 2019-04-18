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
        debugger;

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
  solution = solutionMaker(numberOfRooks, Object.values(newBoard.attributes).slice(0, -1));
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log(solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
