import { describe, expect, test } from '@jest/globals';
import wordle from './feedback.js';

/*

  ___________TEST 1___________

*/

describe('the game wordle', () => {
  test("the words: 'BANAN' and 'VALFISK'", () => {
    const output = wordle('BANAN', 'VALFISK');
    expect(output).toEqual({ result: false, obj: null });
  });

  /*
  ___________TEST 2___________

*/

  test("the words: 'BANAN' and 'BANAN'", () => {
    const output = wordle('BANAN', 'BANAN');
    expect(output).toEqual({
      result: true,
      obj: [
        { letter: 'B', result: 'correct' },
        { letter: 'A', result: 'correct' },
        { letter: 'N', result: 'correct' },
        { letter: 'A', result: 'correct' },
        { letter: 'N', result: 'correct' },
      ],
    });
  });

  /*
  ___________TEST 3___________

*/

  test("the words: 'CYKLA' and 'HALLÅ'", () => {
    const output = wordle('CYKLA', 'HALLÅ');
    expect(output).toEqual({
      result: null,
      obj: [
        { letter: 'H', result: 'incorrect' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'L', result: 'incorrect' },
        { letter: 'L', result: 'correct' },
        { letter: 'Å', result: 'incorrect' },
      ],
    });
  });

  test("the words: 'LUTFISK' and 'VALFISK'", () => {
    const output = wordle('LUTFISK', 'VALFISK');
    expect(output).toEqual({
      result: null,
      obj: [
        { letter: 'V', result: 'incorrect' },
        { letter: 'A', result: 'incorrect' },
        { letter: 'L', result: 'misplaced' },
        { letter: 'F', result: 'correct' },
        { letter: 'I', result: 'correct' },
        { letter: 'S', result: 'correct' },
        { letter: 'K', result: 'correct' },
      ],
    });
  });

  /* 

  ___________TEST 4___________

*/

  test("the words: 'CYKLA' and 'LALHÅ'", () => {
    const output = wordle('CYKLA', 'LALHÅ');
    expect(output).toEqual({
      result: null,
      obj: [
        { letter: 'L', result: 'misplaced' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'L', result: 'incorrect' },
        { letter: 'H', result: 'incorrect' },
        { letter: 'Å', result: 'incorrect' },
      ],
    });
  });

  /* 

  ___________TEST 5___________

*/

  test("the words: 'cYkLa' and 'HaLlÅ'", () => {
    const output = wordle('cYkLa', 'HaLlÅ');
    expect(output).toEqual({
      result: null,
      obj: [
        { letter: 'H', result: 'incorrect' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'L', result: 'incorrect' },
        { letter: 'L', result: 'correct' },
        { letter: 'Å', result: 'incorrect' },
      ],
    });
  });

  test("the words: 'c Y k L a' and 'H  aL l Å'", () => {
    const output = wordle('c Y k L a', 'H  aL l Å');
    expect(output).toEqual({
      result: null,
      obj: [
        { letter: 'H', result: 'incorrect' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'L', result: 'incorrect' },
        { letter: 'L', result: 'correct' },
        { letter: 'Å', result: 'incorrect' },
      ],
    });
  });
});
