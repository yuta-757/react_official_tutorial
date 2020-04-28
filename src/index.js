import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Squareコンポーネントは制御されたコンポーネント
// class Square extends React.Component {
  /* Squareはゲームの状態を管理しなくなったので削除
    constructor(props){
      super(props);
        this.state = {
          value: null,
        };
      }
  */
//     render() {
//       return (
//         <button 
//           className="square" 
//           onClick={() => 
//           this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
// }
  function Square(props){
    return(
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          squares: Array(9).fill(null),
        };
    }

    handleClick(i){
      // .slice()で配列のコピー
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }

    renderSquare(i) {
      // Squareがvalueプロパティ('X', '0', または空のマス目の場合はnull）を受け取る
      // javascriptがretrunの後にセミコロンを挿入するのを防ぐため()をつける
      return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  