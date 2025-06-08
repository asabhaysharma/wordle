import React from 'react';
import { GameState } from '../types/game';

interface GameStatsProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ gameState, onRestart }) => {
  const { gameStatus, secretWord, guesses } = gameState;
  
  if (gameStatus === 'playing') {
    return null;
  }

  const isWon = gameStatus === 'won';
  const message = isWon 
    ? `Congratulations! You guessed it in ${guesses.length} tries!`
    : `Game Over! The word was ${secretWord}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className={`text-6xl mb-4 ${isWon ? 'text-green-500' : 'text-red-500'}`}>
          {isWon ? '🎉' : '😔'}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isWon ? 'text-green-600' : 'text-red-600'}`}>
          {isWon ? 'Victory!' : 'Game Over'}
        </h2>
        <p className="text-gray-700 mb-6">
          {message}
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameStats;