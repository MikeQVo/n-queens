// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;

      for(var i = 0; i < row.length; i++){
        count += row[i];
      }

      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for(var i = 0; i < board.length; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var counter = 0;
      for (var i = 0; i < colIndex.length; i++) {
        if (colIndex[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var tempCol = [];
      var board = this.rows();
      for(var col = 0; col < board.length; col++){
        for(var row = 0; row < board.length; row++ ){
          tempCol.push(board[row][col]);
        }
        if(this.hasColConflictAt(tempCol)){
          return true;
        } else{
          tempCol = [];
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      for (var i = 0; i < majorDiagonalColumnIndexAtFirstRow.length; i++) {
        if (majorDiagonalColumnIndexAtFirstRow[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var majorDiag = [];
      var row, col = 0;


      for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
          if(board[i][j] === 1){
            majorDiag.push(board[i][j]);
            row = i;
            col = j;
            while(row < board.length - 1 && col < board.length - 1){
              row++;
              col++;
              majorDiag.push(board[row][col]);
            }
            if(this.hasMajorDiagonalConflictAt(majorDiag)){
              return true;
            } else {
              majorDiag = [];
            }

          }
        }
      }
      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      for (var i = 0; i < minorDiagonalColumnIndexAtFirstRow.length; i++) {
        if (minorDiagonalColumnIndexAtFirstRow[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var minorDiag = [];
      var row = 0;
      var col = 0;
      var board = this.rows();

      for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
          minorDiag.push(board[i][j]);
          row = i;
          col = j;
          while(row < board.length - 1 && col > 0 ){
            row++;
            col--;
            minorDiag.push(board[row][col]);
          }
          if(this.hasMinorDiagonalConflictAt(minorDiag)){
            return true;
          } else {
            minorDiag = [];
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
