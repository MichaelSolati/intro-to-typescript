import { Player } from './player';
const WordTable = require('word-table');

export class Game {
  private _board: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  private _moves: number = 0;
  private _turn: number = 1;

  constructor(private _player1: Player, private _player2: Player) { }

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

  get activeName(): string {
    return (this._turn === 1) ? this._player1.name : this._player2.name;
  }

  get activeNumber(): number {
    return (this._turn === 1) ? this._player1.number : this._player2.number;
  }

  get moves(): number {
    return this._moves;
  }

  public play(column: any, row: any): void {
    const cols: string[] = ['A', 'B', 'C'];
    const rows: string[] = ['1', '2', '3'];
    column = cols.indexOf(column.toUpperCase());
    row = rows.indexOf(row);
    if (column === -1 || row === -1) {
      throw new Error('Invalid point on the board');
    }

    if (this._board[row][column]) {
      throw new Error('Someone has already played there!');
    }

    this._board[row][column] = this.activeNumber;
    (this._turn === 1) ? this._turn = 2 : this._turn = 1;
    this._moves++;
  }

  public isSolved(): any {
    const board: string = this._board.join('-').replace(/,/g, '');
    if (/222|2..2..2|2...2...2|2....2....2/.test(board)) { return this._player2.name + ' wins!'; }
    if (/111|1..1..1|1...1...1|1....1....1/.test(board)) { return this._player1.name + ' wins!'; }
    if (/0/.test(board)) { return false; }
    return 'Shucks... it\'s a draw!';
  }
}