import { LetterState } from '../types/game';

export const checkGuess = (guess: string, secretWord: string): LetterState[] => {
  // Validate inputs
  if (!guess || !secretWord) {
    console.error('Invalid input to checkGuess:', { guess, secretWord });
    return Array(5).fill({ letter: '', status: 'empty' });
  }

  const result: LetterState[] = [];
  const secretLetters = secretWord.split('');
  const guessLetters = guess.split('');
  
  // First pass: mark correct positions
  const remainingSecret: string[] = [];
  const remainingGuess: { letter: string; index: number }[] = [];
  
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === secretLetters[i]) {
      result[i] = { letter: guessLetters[i], status: 'correct' };
    } else {
      result[i] = { letter: guessLetters[i], status: 'absent' };
      remainingSecret.push(secretLetters[i]);
      remainingGuess.push({ letter: guessLetters[i], index: i });
    }
  }
  
  // Second pass: mark present letters
  for (const { letter, index } of remainingGuess) {
    const secretIndex = remainingSecret.indexOf(letter);
    if (secretIndex !== -1) {
      result[index].status = 'present';
      remainingSecret.splice(secretIndex, 1);
    }
  }
  
  return result;
};

export const getKeyboardStatus = (
  guesses: string[],
  secretWord: string
): Map<string, 'correct' | 'present' | 'absent' | 'unused'> => {
  const keyboardStatus = new Map<string, 'correct' | 'present' | 'absent' | 'unused'>();
  
  for (const guess of guesses) {
    const result = checkGuess(guess, secretWord);
    
    for (let i = 0; i < result.length; i++) {
      const { letter, status } = result[i];
      if (!letter || status === 'empty') continue;
      
      const currentStatus = keyboardStatus.get(letter) || 'unused';
      
      // Priority: correct > present > absent > unused
      if (status === 'correct') {
        keyboardStatus.set(letter, 'correct');
      } else if (status === 'present' && currentStatus !== 'correct') {
        keyboardStatus.set(letter, 'present');
      } else if (status === 'absent' && currentStatus === 'unused') {
        keyboardStatus.set(letter, 'absent');
      }
    }
  }
  
  return keyboardStatus;
};