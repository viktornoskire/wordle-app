export default function wordle(chosen, guess) {
  let c = chosen.replace(/\s/g, '').toUpperCase();
  let g = guess.replace(/\s/g, '').toUpperCase();

  if (c.length !== g.length) {
    return { result: false, obj: null };
  }

  const chosenWord = c.split('');

  const res = g.split('').map((char, index) => {
    if (char === c[index]) {
      chosenWord[index] = '';
      return { letter: char, result: 'correct' };
    } else {
      return { letter: char, result: '' };
    }
  });

  return {
    result: c === g ? true : null,
    obj: res.map(charObj => {
      if (charObj.result === '') {
        const char = charObj.letter;
        const correctChar = chosenWord.indexOf(char);

        if (correctChar !== -1) {
          chosenWord[correctChar] = '';
          return { letter: char, result: 'misplaced' };
        } else {
          return { letter: char, result: 'incorrect' };
        }
      } else {
        return charObj;
      }
    }),
  };
}
