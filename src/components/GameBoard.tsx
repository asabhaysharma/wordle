import React from 'react';
import GuessRow from './GuessRow';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  invalidWord: boolean;
  animatingRow: number | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, invalidWord, animatingRow }) => {
  const { guesses, currentGuess, secretWord, currentRow } = gameState;
  const maxGuesses = 5;
  const maxLength = 5;

  const rows = [];
  
  // Add completed guesses
  for (let i = 0; i < guesses.length; i++) {
    rows.push(
      <GuessRow
        key={i}
        guess={guesses[i]}
        secretWord={secretWord}
        isCurrentGuess={false}
        maxLength={maxLength}
        isAnimating={animatingRow === i}
      />
    );
  }
  
  // Add current guess row
  if (guesses.length < maxGuesses) {
    rows.push(
      <GuessRow
        key={currentRow}
        guess={currentGuess}
        secretWord={secretWord}
        isCurrentGuess={true}
        maxLength={maxLength}
        isInvalid={invalidWord}
      />
    );
  }
  
  // Add empty rows
  for (let i = guesses.length + 1; i < maxGuesses; i++) {
    rows.push(
      <GuessRow
        key={i}
        guess=""
        secretWord={secretWord}
        isCurrentGuess={false}
        maxLength={maxLength}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {rows}
    </div>
  );
};

export default GameBoard;