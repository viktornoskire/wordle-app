export default function Rules() {
  return (
    <div className='start--page_rules'>
      <h3 className='rules_rules--title'>Rules</h3>
      <ol className='rules_rules--list'>
        <li>
          <strong>Choose your word length</strong> - Pick how many letters the secret word will have.
        </li>
        <li>
          <strong>Guess the word</strong> - Type in words to figure it out. Unlimited guesses!
        </li>
        <li>
          <strong>Use color clues</strong> -
          <br />
          <strong className='rules--list_green'>Green</strong>: right letter, right spot <br />
          <strong className='rules--list_yellow'>Yellow</strong>: right letter, misplaced <br />
          <strong className='rules--list_red'>Red</strong>: letter not in the word
        </li>
      </ol>
    </div>
  );
}
