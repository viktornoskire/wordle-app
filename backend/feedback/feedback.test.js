import { describe, expect, test } from "@jest/globals";
import wordle from "./feedback.js";

/* 

  Test strategy: 

    Test 1: These tests verifies whether the two words are the
            same length, if not, the function will return a message.

    Test 2: Verifies if the words are the same, then the function
            responds with a message.  

    Test 3: Here the test is running a normal "Wordle" case 
            with two words with the same length. Sends two words 
            in the function and for each letter in the guessed word 
            it returns an object with corresponding 
            result for that letter.
    
    Test 4: If there is one L in the chosen word and the user
            inputs a word with two L, the function will output 
            one of these L:s as incorrect.

    Test 5: Test verifies that the game will still function if
            the chosen word or the guessed word includes any
            capitalized letters or any whitespace. 


*/

/*

  ___________TEST 1___________

*/

describe("the game wordle", () => {
  test("the words: 'BANAN' and 'VALFISK'", () => {
    const output = wordle("BANAN", "VALFISK");
    expect(output).toEqual("Word length does not match!");
  });

/*

  ___________TEST 2___________

*/

  test("the words: 'BANAN' and 'BANAN'", () => {
    const output = wordle("BANAN", "BANAN");
    expect(output).toEqual("Your guess is correct!");
  });

/* 

  ___________TEST 3___________

*/

  test("the words: 'CYKLA' and 'HALLÅ'", () => {
    const output = wordle("CYKLA", "HALLÅ");
    expect(output).toEqual([
      { letter: "H", result: "incorrect" },
      { letter: "A", result: "misplaced" },
      { letter: "L", result: "incorrect" },
      { letter: "L", result: "correct" },
      { letter: "Å", result: "incorrect" },
    ]);
  });

  test("the words: 'LUTFISK' and 'VALFISK'", () => {
    const output = wordle("LUTFISK", "VALFISK");
    expect(output).toEqual([
      { letter: "V", result: "incorrect" },
      { letter: "A", result: "incorrect" },
      { letter: "L", result: "misplaced" },
      { letter: "F", result: "correct" },
      { letter: "I", result: "correct" },
      { letter: "S", result: "correct" },
      { letter: "K", result: "correct" },
    ]);
  });

/* 

  ___________TEST 4___________

*/

  test("the words: 'CYKLA' and 'LALHÅ'", () => {
    const output = wordle("CYKLA", "LALHÅ");
    expect(output).toEqual([
      { letter: "L", result: "misplaced" },
      { letter: "A", result: "misplaced" },
      { letter: "L", result: "incorrect" },
      { letter: "H", result: "incorrect" },
      { letter: "Å", result: "incorrect" },
    ]);
  });

/* 

  ___________TEST 5___________

*/

  test("the words: 'cYkLa' and 'HaLlÅ'", () => {
    const output = wordle("cYkLa", "HaLlÅ");
    expect(output).toEqual([
      { letter: "H", result: "incorrect" },
      { letter: "A", result: "misplaced" },
      { letter: "L", result: "incorrect" },
      { letter: "L", result: "correct" },
      { letter: "Å", result: "incorrect" },
    ]);
  });

  test("the words: 'c Y k L a' and 'H  aL l Å'", () => {
    const output = wordle("c Y k L a", "H  aL l Å");
    expect(output).toEqual([
      { letter: "H", result: "incorrect" },
      { letter: "A", result: "misplaced" },
      { letter: "L", result: "incorrect" },
      { letter: "L", result: "correct" },
      { letter: "Å", result: "incorrect" },
    ]);
  });
});
