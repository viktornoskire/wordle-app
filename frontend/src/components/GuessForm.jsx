import { useState } from 'react';

export default function GuessForm({ onGuess }) {
  const [guessed, setGuessed] = useState('');
  const [error, setError] = useState(false);

  let guessForm = 'user--form';

  if (error) {
    guessForm += ' error--active';
  }

  return (
    <form
      className={'play--page ' + guessForm}
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
        className='user--form_guess--input'
        type='text'
        placeholder='Your guess...'
        value={guessed}
        onChange={e => {
          if (error) {
            setError(false);
          }
          setGuessed(e.target.value);
        }}
      />
      <small className='user--error'>Incorrect word length</small>
      <button className='user--form_guess--button' type='submit'>
        Guess
      </button>
    </form>
  );
}
