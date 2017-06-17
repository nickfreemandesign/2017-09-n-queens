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
  var solution; //declared to store and return solution
  var boardObj = new Board({n: n});
  var board = boardObj.rows();


  //recursive function goes here
  var findSolution = function ( board, rooksLeft, rowIndex) {

    //rowIndex allows us to jump to next row when viable rook is found

    if ( rooksLeft === 0 ) {
      //if there are no rows left, solution is returned
      return board;
    }

    var row = rowIndex; //for readability

    for ( var col = 0; col < board[row].length; col++ ) {

      boardObj.togglePiece(row, col); //toggle each coordinate of current row
      if ( boardObj.hasAnyRooksConflicts() ) {
        boardObj.togglePiece(row, col); // untoggle in event of conflict
      } else {
        // if viable rook is found, recursively start on next row
        return findSolution( board, rooksLeft - 1, rowIndex + 1);
        // togglePiece(row,col)
      }
    }
  };

  //call find solution on the first row, index 0
  solution = findSolution( board, n, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  //declare solutionCount, default assignment is 0
  var solutionCount = 0;
  //declare one board object, passing in n for size
  var boardObj = new Board({n: n});
  //declare board, calling rows() on board object
  var board = boardObj.rows();


  //inner recursive function goes here
  var findSolution = function ( board, rooksLeft, rowIndex) {
    //if n rooks have been placed
    if ( rooksLeft === 0 ) {
      //add 1 to solutionCount
      solutionCount++;
    } else {
    //loop through columns
      var row = rowIndex;
      for ( var col = 0; col < board[row].length; col++ ) {
        //toggle rook
        boardObj.togglePiece(row, col);
        //if there is a conflict on board
        if ( boardObj.hasAnyRooksConflicts() ) {
            //remove rook
          boardObj.togglePiece(row, col);
        } else {
          //head down recursive path with that toggled piece
          findSolution( board, rooksLeft - 1, rowIndex + 1);
          //untoggle that piece and continue for loop
          boardObj.togglePiece(row, col);
        }
      }
    }
  };

  //instantiate recursive loop
  findSolution( board, n, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //return empty board if n is 2 or 3 because there is
  //no solution for these edge cases
  if (n === 2 || n === 3) {
    var boardObj = new Board({n: n});
    return boardObj.rows();
  }
  //declare one board object, passing in n for size
  var boardObj = new Board({n: n});
  //declare board, calling rows() on board object
  var board = boardObj.rows();


  //inner recursive function that moves through the board
  var findSolution = function ( board, rowIndex) {

  //base case to exit when the row outside the bounds of
  //the chessboard
    if ( rowIndex === n ) {
  //return the board back to result
      return board;
    } else {
      var row = rowIndex; //set as row for readability
      //loop through columns, with first call starting at first row
      for ( var col = 0; col < board[row].length; col++ ) {
        //toggle queen
        boardObj.togglePiece(row, col);
        //check if there are any conflicts from the newly toggled queen
        if ( boardObj.hasAnyQueensConflicts() ) {
          //if conflict is true, untoggle
          boardObj.togglePiece(row, col);
        } else {
          //if no conflict, pass modified board to recursive loop, starting
          //at next row
          var result = findSolution( board, rowIndex + 1);
          //once recursive loop hits base case and returns board,
          //result will be truthy
          if (result) {
            //return result back to solution
            return result;
          }
          //untoggle board
          boardObj.togglePiece(row, col);
        }
      }
    }
  };
  //initialize recursive loop, starting with an empty board, at the top rowIndex
  //store the result in solution
  var solution = findSolution(board, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  //declare solutionCount, default assignment is 0
  var solutionCount = 0;
  //declare one board object, passing in n for size
  var boardObj = new Board({n: n});
  //declare board, calling rows() on board object
  var board = boardObj.rows();


  //inner recursive function goes here
  var findSolution = function ( board, rowIndex) {
    //if n rooks have been placed
    if ( rowIndex === n ) {
      //add 1 to solutionCount
      solutionCount++;
    } else {
    //loop through columns
      var row = rowIndex;
      for ( var col = 0; col < board[row].length; col++ ) {
        //toggle rook
        boardObj.togglePiece(row, col);
        //if there is a conflict on board
        if ( boardObj.hasAnyQueensConflicts() ) {

          boardObj.togglePiece(row, col);
        } else {
          //head down recursive path with that toggled piece
          findSolution( board, rowIndex + 1 );
          //untoggle that piece and continue for loop
          boardObj.togglePiece(row, col);
        }
      }
    }
  };

  //instantiate recursive loop
  findSolution( board, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
