import { useState } from 'react';

export default function GuessForm({ onGuess }) {
  const [guessed, setGuessed] = useState('');
  const [error, setError] = useState(false);

  let guessForm = 'user-form';

  if (error) {
    guessForm += ' error-active';
  }

  return (
    <form
      className={guessForm}
      onSubmit={async e => {
        e.preventDefault();
        const response = await fetch('/api/check-word', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guessed,
          }),
        });
        const { data } = await response.json();
        if (data.result == false) {
          setError(true);
        } else {
          setGuessed('');
          onGuess(data);
        }
      }}>
      <input
        type='text'
        placeholder='guess the word'
        value={guessed}
        onChange={e => {
          if (error) {
            setError(false);
          }
          setGuessed(e.target.value);
        }}
      />
      <small className='user-error'>Incorrect word length</small>
      <button type='submit'>Guess The Word</button>
    </form>
  );
}
