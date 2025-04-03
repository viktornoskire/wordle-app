import { useState } from 'react';

function App() {
  const [chosen, setChosen] = useState('');
  const [guessed, setGuessed] = useState('');
  const [answer, setAnswer] = useState([]);

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
          onClick={async e => {
            e.preventDefault();
            const response = await fetch('/api/words', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                chosen,
                guessed,
              }),
            });
            if (response.status == 201) {
              setChosen('');
              setGuessed('');
              const payload = await response.json();
              const data = payload.data;

              console.log(data);

              setAnswer(data);
            } else {
              console.log('error');
            }
          }}>
          Guess The Word
        </button>
      </form>
      <h2>List</h2>
      <ul>
        {answer.map(letter => {
          return (
            <li>
              {letter.letter}: {letter.result}
            </li>
          );
        })}
      </ul>
      ;
    </main>
  );
}

export default App;
