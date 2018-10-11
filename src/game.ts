const WordTable = require('word-table');

export class Game {
  private _board: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  private _moves: number = 0;
  private _turn: number = 1;

  constructor() { }

  get board(): string {
    const header: string[] = ['', 'A', 'B', 'C'];
    const body: any[][] = [
      ['1', ...this._board[0]],
      ['2', ...this._board[1]],
      ['3', ...this._board[2]]
    ];
    const board = new WordTable(header, body);
    return board.string();
  }

  public isSolved(): any {
    const board: string = this._board.join('-').replace(/,/g, '');
    if (/222|2..2..2|2...2...2|2....2....2/.test(board)) { return 'player 2  wins!'; }
    if (/111|1..1..1|1...1...1|1....1....1/.test(board)) { return 'player 1  wins!'; }
    if (/0/.test(board)) { return false; }
    return 'Shucks... it\'s a draw!';
  }
}