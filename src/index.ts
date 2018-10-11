import { Game } from './game'
import { Player } from './player'
import * as readlineSync from 'readline-sync';

let keepPlaying: boolean = true;

while (keepPlaying) {
  let player1: Player;
  let player2: Player;
  let name: string;

  while (!name) {
    name = readlineSync.question('May I have your name, player one? ');
  }
  player1 = new Player(name, 1);
  console.log('Welcome to the game', name, '\n');

  name = null;
  while (!name) {
    name = readlineSync.question('And your name player two? ');
  }
  player2 = new Player(name, 2);
  console.log('Welcome to the game', name, '\n');

  console.log('IT\'S TIME TO PLAY THE GAME!!!');

  const game: Game = new Game(player1, player2);

  while (!game.isSolved()) {
    console.log('\n'+game.board);
    console.log(game.activeName + ' it\'s your move');

    let valid: boolean;
    while (!valid) {
      try {
        const col: string = readlineSync.question('Column: ');
        const row: string = readlineSync.question('Row: ');
        game.play(col, row);
        valid = true;
      } catch (e) {
        console.warn(e.message + '\n');
      }
    }
  }

  console.log(game.board + '\n');
  console.log(game.isSolved() + '\n');

  let question: string = readlineSync.question('Play again? Y/n ').toUpperCase();
  if (question !== 'Y' && question !== 'YES') { keepPlaying = false; }
}