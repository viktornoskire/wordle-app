// import loadWordsJSON from '../loadWordJSON.js';

export default function loadChosenWord(wordsList, charAmount, unique) {
  const competentWords = wordsList.filter(word => {
    if (word.length === charAmount) {
      return word;
    }
  });

  if (unique) {
    const uniqueWords = competentWords.filter(word => {
      let currentWord = '';
      for (let char = 0; char < word.length; char++) {
        if (currentWord.length == 0) {
          currentWord += word[char];
        } else {
          if (currentWord.split('').includes(word[char])) {
            currentWord = false;
            break;
          } else {
            currentWord += word[char];
          }
        }
      }
      if (currentWord !== false) {
        return currentWord;
      }
    });

    if (uniqueWords.length == 0) {
      return false;
    }
    const word = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
    return word;
  } else {
    if (competentWords.length == 0) {
      return false;
    }
    const word = competentWords[Math.floor(Math.random() * competentWords.length)];
    return word;
  }
}

/* const words = await loadWordsJSON('./words.json');

const word = loadChosenWord(words, 7, false);
console.log(word);
 */
