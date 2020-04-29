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
  // 関数コンポーネント：renderメソッドだけを有する。自分のstateを持たないコンポーネントをシンプルに記述する方法
  function Square(props){
    return(
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    // Gameコンポーネントへのリフトアップのため削除
    // constructor(props){
    //   super(props);
    //   this.state = {
    //       squares: Array(9).fill(null),
    //       // デフォルトではxが先行
    //       xIsNext: true,
    //     };
    // }

    // handleClick(i){
    //   // .slice()で配列のコピー
    //   const squares = this.state.squares.slice();
    //   if(calculateWinner(squares) || squares[i]){
    //     // 勝者がきまっている　または　クリックしたsquareに値が入っている場合、squaresを更新しない
    //     return;
    //   }
    //   // squares[i] = this.state;
    //   // ボードの'X''O'の更新
    //   squares[i] = this.state.xIsNext ? 'X' : 'O';
    //   this.setState({
    //     squares: squares,
    //     xIsNext: !this.state.xIsNext,
    //   });
    // }

    renderSquare(i) {
      // Squareがvalueプロパティ('X', '0', または空のマス目の場合はnull）を受け取る
      // javascriptがretrunの後にセミコロンを挿入するのを防ぐため()をつける
      return (
      <Square 
        // value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      // const status = 'Next player: ' +
      // (this.state.xIsNext ? 'X' : 'O');
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // winnerに値が入っている＝勝者が決まっている
      // if(winner){
      //   status = 'Winner: ' + winner;
      // }else{
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }

      return (
        <div>
          {/* <div className="status">{status}</div> */}
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
  // Gameコンポーネントの初期stateをコンストラクタ内でセットする
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };
    }

    handleClick(i){
      // historyの追加
      const history = this.state.history;
      const current = history[history.length　-1];

      const squares = current.squares.slice();
      if(calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        //concat({})でもOK
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }


    render() {
      // stateのhistoryを定義
      const history = this.state.history;
      // 配列の長さ - 1 = 最も最後に追加されたボート（添字）
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);

      // 過去の着手の表示
      const moves = history.map((step, move) =>{
        const desc = move ?
        'Go to move #' + move:
        'GO to game start';
        return(
          <li>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if(winner){
        status = 'Winner' + winner;
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}}</ol>
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
  
  function calculateWinner(squares) {
    const lines = [
      // 縦、横、斜めのラインの組み合わせを定義
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // ラインの'X'または'O'全てが一致しているかどうか
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // 一致した時点でループが修了し、結果が返される -> [0,1,2]のラインが最も優先されて結果に反映される
        return squares[a];
      }
    }
    return null;
  }