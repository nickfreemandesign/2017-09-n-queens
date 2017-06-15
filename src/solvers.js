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
  //declare solution variable that stores viable rook combination
  var solution; //fixme
  var boardObj = new Board({n: n});
  var board = boardObj.rows();


  //recursive function goes here
  var findSolution = function ( board, rooksLeft, rowIndex) {

    if ( rooksLeft === 0 ) {
      return board;
    }

    //loop through the rows
      //loop through columns
      var row = rowIndex;
      for ( var col = 0; col < board[row].length; col++ ) {
        //toggle rook at each coordinate
        boardObj.togglePiece(row, col);
        // check for conflicts, both rows and columns
        //if conflicts
        if ( boardObj.hasAnyRooksConflicts() ) {
          //untoggle action
          boardObj.togglePiece(row, col);
          // if no conflicts,
        } else {
          // recurse passing in modified board, rooksleft-1
          return findSolution( board, rooksLeft - 1, rowIndex + 1);
        }
      }

  };

  //instantiate with a single rook in the rop left
  solution = findSolution( board, n, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
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
