import { useState } from 'react';

function App() {
  const [chosen, setChosen] = useState('');
  const [guessed, setGuessed] = useState('');

  return (
    <main>
      <form>
        <input
          type='text'
          placeholder='chosen word'
          value={chosen}
          onChange={e => {
            setChosen(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='guess the word'
          value={guessed}
          onChange={e => {
            setGuessed(e.target.value);
          }}
        />
        <button
          type='submit'
          onClick={e => {
            e.preventDefault();
            setChosen('');
            setGuessed('');
          }}>
          Guess The Word
        </button>
      </form>
    </main>
  );
}

export default App;
