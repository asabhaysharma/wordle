import React from 'react';
import { LetterState } from '../types/game';
import { checkGuess } from '../utils/wordUtils';

interface GuessRowProps {
  guess: string;
  secretWord: string;
  isCurrentGuess: boolean;
  maxLength: number;
  isInvalid?: boolean;
  isAnimating?: boolean;
}

const GuessRow: React.FC<GuessRowProps> = ({ 
  guess, 
  secretWord, 
  isCurrentGuess, 
  maxLength, 
  isInvalid = false,
  isAnimating = false 
}) => {
  const letters: LetterState[] = [];
  
  if (guess && !isCurrentGuess) {
    // Completed guess - show results
    letters.push(...checkGuess(guess, secretWord));
  } else {
    // Current guess or empty row
    for (let i = 0; i < maxLength; i++) {
      letters.push({
        letter: guess[i] || '',
        status: 'empty'
      });
    }
  }

  const getTileClass = (status: string, index: number) => {
    const baseClasses = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-md transition-all duration-300';
    
    if (isAnimating) {
      return `${baseClasses} animate-pulse`;
    }
    
    if (isInvalid && isCurrentGuess) {
      return `${baseClasses} border-red-500 bg-red-50 animate-bounce`;
    }
    
    switch (status) {
      case 'correct':
        return `${baseClasses} bg-green-500 border-green-500 text-white transform scale-105`;
      case 'present':
        return `${baseClasses} bg-yellow-500 border-yellow-500 text-white transform scale-105`;
      case 'absent':
        return `${baseClasses} bg-gray-600 border-gray-600 text-white`;
      case 'empty':
        return guess[index] 
          ? `${baseClasses} border-gray-400 bg-white text-gray-800 transform scale-105`
          : `${baseClasses} border-gray-300 bg-white text-gray-800`;
      default:
        return `${baseClasses} border-gray-300 bg-white text-gray-800`;
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {letters.map((letterState, index) => (
        <div
          key={index}
          className={getTileClass(letterState.status, index)}
          style={{
            animationDelay: isAnimating ? `${index * 100}ms` : '0ms'
          }}
        >
          {letterState.letter}
        </div>
      ))}
    </div>
  );
};

export default GuessRow;