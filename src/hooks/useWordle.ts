import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types/game';
import { getRandomWord, isValidWord } from '../data/words';

export const useWordle = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: '',
    guesses: [],
    secretWord: getRandomWord(),
    gameStatus: 'playing',
    currentRow: 0,
  });

  const [invalidWord, setInvalidWord] = useState(false);
  const [animatingRow, setAnimatingRow] = useState<number | null>(null);

  const resetGame = useCallback(() => {
    setGameState({
      currentGuess: '',
      guesses: [],
      secretWord: getRandomWord(),
      gameStatus: 'playing',
      currentRow: 0,
    });
    setInvalidWord(false);
    setAnimatingRow(null);
  }, []);

  const addLetter = useCallback((letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length >= 5) {
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter
    }));
    setInvalidWord(false);
  }, [gameState.gameStatus, gameState.currentGuess.length]);

  const removeLetter = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length === 0) {
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1)
    }));
    setInvalidWord(false);
  }, [gameState.gameStatus, gameState.currentGuess.length]);

  const submitGuess = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length !== 5) {
      return;
    }

    if (!isValidWord(gameState.currentGuess)) {
      setInvalidWord(true);
      return;
    }

    setAnimatingRow(gameState.currentRow);
    
    setTimeout(() => {
      setGameState(prev => {
        const newGuesses = [...prev.guesses, prev.currentGuess];
        const isWin = prev.currentGuess === prev.secretWord;
        const isLoss = newGuesses.length >= 5 && !isWin;
        
        return {
          ...prev,
          guesses: newGuesses,
          currentGuess: '',
          currentRow: prev.currentRow + 1,
          gameStatus: isWin ? 'won' : isLoss ? 'lost' : 'playing'
        };
      });
      setAnimatingRow(null);
    }, 300);
  }, [gameState.gameStatus, gameState.currentGuess, gameState.currentRow, gameState.secretWord]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitGuess();
      } else if (event.key === 'Backspace') {
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [addLetter, removeLetter, submitGuess]);

  return {
    gameState,
    invalidWord,
    animatingRow,
    resetGame,
    addLetter,
    removeLetter,
    submitGuess,
  };
};