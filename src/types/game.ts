export interface GameState {
  currentGuess: string;
  guesses: string[];
  secretWord: string;
  gameStatus: 'playing' | 'won' | 'lost';
  currentRow: number;
}

export interface LetterState {
  letter: string;
  status: 'correct' | 'present' | 'absent' | 'empty';
}

export interface KeyboardKey {
  key: string;
  status: 'correct' | 'present' | 'absent' | 'unused';
}