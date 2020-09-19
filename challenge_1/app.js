//"state board"

var boardState = {
  turns: 0,
  winner: '',
  whosTurn:'x',
  board:[['( )', '( )', '( )'],
         ['( )', '( )', '( )'],
         ['( )', '( )', '( )']],
}


//set x or o
function updateBoard(event, column, row){
  let spot = boardState.board[row][column];
  if(spot === '( )'){
    if(boardState.whosTurn === 'x'){
      boardState.board[row][column] = '(x)';
      event.target.innerHTML = '(x)';
      boardState.whosTurn = 'o';
      document.getElementById('whosturn').innerHTML = "its O's turn..";
      boardState.turns++;
    } else {
      boardState.board[row][column] = '(o)';
      event.target.innerHTML = '(o)';
      boardState.whosTurn = 'x';
      document.getElementById('whosturn').innerHTML = "its X's turn..";
      boardState.turns++;
    }
    checkWinConditions();
    checkForWin();
  } else {
    console.log('that spot is taken...');
  }
}

//checks for win conditions
function checkWinConditions(){
  let winner = '';
  let condition = boardState.board;

  //checks top left starting diagnal win
  if((condition[0][0]=== condition[1][1] &&condition[0][0]=== condition[2][2]) && condition[0][0] !== '( )'){
    winner = condition[0][0];
  }
  //checks top right diagnal win
  if((condition[0][2]=== condition[1][1] &&condition[0][2]=== condition[2][0]) && condition[0][2] !== '( )'){
    winner = condition[0][2];
  }


  if(winner === ''){
    //checks row wins
    for(var i = 0; i < condition.length; i++){
      let first = condition[i][0];
      let count = 0;
      for(var j = 0; j < condition[i].length; j++){
        if(condition[i][j] === first && first !== '( )'){
          count++;
        }
        if(count === 3){
          winner = first;
        }
      }
    }

    //checks column wins
    for(var i = 0; i < condition[0].length; i++){
      let first = condition[0][i];
      let count = 0;
      for(var j = 0; j < condition[i].length; j++){
       if(condition[j][i] === first && first !== '( )'){
         count++;
       }
       if(count === 3){
         winner = first;
       }
      }
    }
  }

  if(winner !== ''){
    boardState.winner = winner;
    console.log(winner);
  }
}

//establishes the end result of the match
function checkForWin(){
  if(boardState.winner !== ''){
    console.log('it got in here');
    document.getElementById('whosturn').innerHTML = `${boardState.winner[1]} is the winner!!!`;
    for(var i = 0; i < 9; i++){
      document.getElementsByClassName("item")[i].innerHTML = boardState.winner;
    }
  } else if(boardState.turns === 9){
    document.getElementById('whosturn').innerHTML = `its a tie!!!!!!!!!!!`;
    for(var i = 0; i < 9; i++){
      document.getElementsByClassName("item")[i].innerHTML ='(!)';
    }
  }
}

//resets the game
function reset(){
  boardState.board = [['( )', '( )', '( )'],
  ['( )', '( )', '( )'],
  ['( )', '( )', '( )']];
  boardState.whosTurn = 'x';
  document.getElementById('whosturn').innerHTML = "its X's turn..";
  boardState.winner = '';
  boardState.turns = 0;
  for(var i = 0; i < 9; i++){
    document.getElementsByClassName("item")[i].innerHTML ='( )';
  }
}



//adds on click to row 0
document.getElementById('r0c0').onclick = (event)=>{updateBoard(event, 0, 0)};
document.getElementById('r0c1').onclick = (event)=>{updateBoard(event, 0, 1)};
document.getElementById('r0c2').onclick = (event)=>{updateBoard(event, 0, 2)};

//adds on click to row 1
document.getElementById('r1c0').onclick = (event)=>{updateBoard(event, 1, 0)};
document.getElementById('r1c1').onclick = (event)=>{updateBoard(event, 1, 1)};
document.getElementById('r1c2').onclick = (event)=>{updateBoard(event, 1, 2)};

//adds on click to row 2
document.getElementById('r2c0').onclick = (event)=>{updateBoard(event, 2, 0)};
document.getElementById('r2c1').onclick = (event)=>{updateBoard(event, 2, 1)};
document.getElementById('r2c2').onclick = (event)=>{updateBoard(event, 2, 2)};

//adds on click to reset button
document.getElementById('restart').onclick = reset;


