import  React, { useState }  from 'react';
import ReactDOM  from 'react-dom';
import './index.css';

const Square = (props) => {
  return (
    <button 
      className= "square " 
      onClick={props.onClickEvent}
      >
        {props.value}
    </button>
  );
};

const Board = () => {
  /* const initialSquares = [
    null, null, null,
    null, null, null,
    null, null, null
  ];
  // mmkn abdlha b al tare2a dii
  */
  const initialSquares = Array(9).fill(null); 
  const [squares , setSquares] = useState (initialSquares);   //h5ly al usestate al inital bta3ha 2n ykon al board fady mn al 7rof f kolo b null
  const [xIsNext , setXIsNext] = useState(true);  //n5leha boolen 34an al default yb2a x al byl3b b3den b3d al move tb2a false 34an al O al yl3b

  const rednderSquare = (i) => {   //easier to keep track of the flow and easier to indentify bugs
    return (
      <Square 
        value = {squares[i]}
        onClickEvent = {() => handleClickEvent(i)}
      />  //3shan y-send mkan al click 
     );
  } 

  const winner = calculateWinner(squares);
  const status = winner ? 
    `Winner: ${winner}` :   //check 2n 7d ksb y-stop al le3ba yktb men ksab 8eer kda ykml men doro
    `Next Player : ${xIsNext ? 'X' : 'O'}` ;

  const handleClickEvent = (i) => {   //bta5od al i as argument 3shan a7dd al mkan al hktb feh

    // 1. Make a copy of squares state array
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));    //bt-return lw feh winner hykon men f h5leha boolean 34an m7taga a3rf feh wla laa msh men
    const squareFilled = Boolean(newSquares[i]);          //3shan a-check al mkan dh filled or not 3shan ymn3 2no y7ot ramz fo2 al tany
    if( squareFilled || winnerDeclared ){
        return;     //y3ni fe 7alt 2n ay 7aga mnhom true mtnfz4 al click dh
    }

    // 2. Mutate the copy, setting the i-th element to 'X'
    newSquares[i] = xIsNext ? 'X' : 'O';   //a5leh y-check al dor 3la men

    // 3. Call the setsquares function with the mutated copy
    setSquares(newSquares);   //34an al 2dema = al gdeda kda 
    setXIsNext(!xIsNext);     //34an y-flip al value al feha 34an y8yr al dor kol mra


  }

  return (
    <div style={{
      backgroundColor: 'black',
      margin: 10,
      padding: 20,
    }}>
      <div className='status'> {status}</div>
      <div className="board-row">
        {rednderSquare(0)}{rednderSquare(1)}{rednderSquare(2)}
      </div>
      <div className="board-row">
        {rednderSquare(3)}{rednderSquare(4)}{rednderSquare(5)}
      </div>
      <div className="board-row">
        {rednderSquare(6)}{rednderSquare(7)}{rednderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game ">
      Tic-Tac-Toe
      <Board/>
    </div>
  );
};

ReactDOM.render (
  <Game/>,
  document.getElementById('root')
);

function calculateWinner (squares){   //bta5od al array al feha al current values
  //al a7tmalat bta3t al hyksb ykon azay
  const lines = [
      [0,1,2], [3,4,5], [6,7,8],   //rows
      [0,3,6], [1,4,7], [2,5,8],   //columns
      [0,4,8], [2,4,6],           // diagonals 
  ];
  
  //loop to see if our array contains any of these winning combinations 
  for (let line of lines){
    const [a, b, c] = line;

    if( squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];    // 'x' or 'o'
    }
  }
  return null;
}