export default function Rules() {
  return (
    <div className='rules'>
      <h3 className='rulesTitle'>Rules</h3>
      <ol className='rulesList'>
        <li>
          <strong>Choose your word length</strong> - Pick how many letters the secret word will have.
        </li>
        <li>
          <strong>Guess the word</strong> - Type in words to figure it out. Unlimited guesses!
        </li>
        <li>
          <strong>Use color clues</strong> -
          <br />
          <strong className='green'>Green</strong>: right letter, right spot <br />
          <strong className='yellow'>Yellow</strong>: right letter, misplaced <br />
          <strong className='red'>Red</strong>: letter not in the word
        </li>
      </ol>
    </div>
  );
}
