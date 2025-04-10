import { useState } from 'react';

export default function GuessForm({ onGuess }) {
  const [guessed, setGuessed] = useState('');

  return (
    <form
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
        if (response.status == 201) {
          setGuessed('');
          onGuess(response);
        } else {
          console.log('error');
        }
      }}>
      <input
        type='text'
        placeholder='guess the word'
        value={guessed}
        onChange={e => {
          setGuessed(e.target.value);
        }}
      />
      <button type='submit'>Guess The Word</button>
    </form>
  );
}
