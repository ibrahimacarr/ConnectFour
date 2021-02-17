var player_one_name = prompt("Player One You Are Blue! What is Your Name?")
var player_two_name = prompt("Player One Two Are Blue! What is Your Name?")
var cells = $('button');
var current_order_color = 'B';
var totalColumnNumber = 8;
var totalRowNumber = 6;
var gameDictionaries = initiliazeGameBoard(totalRowNumber, totalColumnNumber);
var rowDictionary = gameDictionaries[0];
var columnDictionary = gameDictionaries[1];
var blueWinning = ['B', 'B', 'B', 'B'];
var yellowWinning = ['Y', 'Y', 'Y', 'Y'];

cells.click(makeMove);

function makeMove() {
  var clickedColIndex = $(this).closest('td').index();
  detectTargetCell(clickedColIndex);
  checkGameFinished();
};

function checkGameFinished() {
  for (var i in columnDictionary) {
    moveList = columnDictionary[i];
    console.log(moveList);
    if (checkListContainsSublist(blueWinning, moveList) | checkListContainsSublist(blueWinning, moveList)) {
      alert(player_one_name + " Wins refresh to play again!");
    } else if (checkListContainsSublist(yellowWinning, moveList) | checkListContainsSublist(yellowWinning, moveList)) {
      alert(player_one_name + " Wins refresh to play again!");
    }
  }
  for (var i in rowDictionary) {
    moveList = rowDictionary[i];

    console.log(columnDictionary);
    if (checkListContainsSublist(blueWinning, moveList) | checkListContainsSublist(blueWinning, moveList)) {
      alert(player_one_name + " Wins refresh to play again!")
    } else if (checkListContainsSublist(yellowWinning, moveList) | checkListContainsSublist(yellowWinning, moveList)) {
      alert(player_one_name + " Wins refresh to play again!");
    }
  }

};

function detectTargetCell(clickedColumn) {
  var counter = 0;
  var isLoopOver = false;
  while (!isLoopOver) {
    currentControlRow = totalRowNumber - counter - 1;
    console.log("Current Column Number: " + clickedColumn);
    console.log("Current Row Number: " + currentControlRow);
    if (checkvalidRowCol(currentControlRow, clickedColumn)) {
      isValidMove = updateGameBoards(currentControlRow, clickedColumn, current_order_color);
      if (isValidMove) {
        targetCellIndex = getCellIndexFromColAndRow(clickedColumn, currentControlRow);
        targetCell = cells.eq(targetCellIndex);
        changeColor(targetCell);
        isLoopOver = true;
      } else {
        isLoopOver = false;
        counter = counter + 1;
      }
    } else {
      isLoopOver = true;
    }
  }
};

function changeColor(cell) {
  console.log("Changing color..");
  if (current_order_color == 'B') {
    cell.css('background-color', 'blue')
    current_order_color = 'Y';
  } else if (current_order_color == 'Y') {
    cell.css('background-color', 'yellow')
    current_order_color = 'B';
  }
};


function initiliazeGameBoard(totalRowNumber, totalColumnNumber) {
  var rowDictionary = {};
  var columnDictionary = {};
  var tmpString = ""
  for (i = 0; i < totalRowNumber; i++) {
    rowDictionary[i] = Array(totalColumnNumber).fill("-");
  }
  for (i = 0; i < totalColumnNumber; i++) {
    columnDictionary[i] = Array(totalRowNumber).fill("-");
  }
  return [rowDictionary, columnDictionary];
};


function checkListContainsSublist(sublist, list) {
  return !!~list.join('').indexOf(sublist.join(''));
}

function getCellIndexFromColAndRow(col, row) {
  return (totalColumnNumber * row) + col;
};

function updateGameBoards(row, col, color) {
  if (rowDictionary[row][col] == '-') {
    rowDictionary[row][col] = color;
    columnDictionary[col][row] = color;
    console.log(rowDictionary);
    console.log(columnDictionary);
    return true;
  } else {
    console.log("Already colored;");
    return false;
  }
};

function checkvalidRowCol(row, col) {
  if (row >= 0 && row < totalRowNumber && col >= 0 && col < totalColumnNumber) {
    console.log("Row: " + row + " Col: " + col + " is valid!");
    return true;
  } else {
    console.log("Not Valid Row or Col");
    return false;
  }
};