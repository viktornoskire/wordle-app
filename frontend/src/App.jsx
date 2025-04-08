import { useState } from 'react';

function App() {
  const [guessed, setGuessed] = useState('');
  const [answers, setAnswers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [unique, setUnique] = useState(false);
  const [settings, setSettings] = useState({});

  return (
    <main>
      <form
        onSubmit={async e => {
          e.preventDefault();
          setAnswers([]);
          console.log(amount, unique);
          console.log(settings);
          const response = await fetch('/api/word', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
          });

          if (response.status == 200) {
            console.log('ok');
          } else {
            console.log('no');
          }
        }}>
        <label htmlFor='charMount'>Amount of characters</label>
        <input
          type='text'
          className='charMount'
          onChange={e => {
            setAmount(Number(e.target.value));
            setSettings({
              charMount: amount,
              unique,
            });
          }}
        />
        <label htmlFor='unique'>Unique</label>
        <input
          type='checkbox'
          className='unique'
          onChange={() => {
            if (unique) {
              setUnique(false);
            } else {
              setUnique(true);
            }
            setSettings({
              charMount: amount,
              unique,
            });
          }}
        />
        <button onClick={async () => {}}>Start</button>
      </form>

      <form>
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
              const payload = await response.json();
              const data = payload.data;

              setAnswers([...answers, data]);
            } else {
              console.log('error');
            }
          }}>
          Guess The Word
        </button>
      </form>
      <h2>Guesses</h2>
      {answers.map(answer => {
        return (
          <ul>
            {answer.map(letter => {
              let className = 'letter ';
              if (letter.result == 'correct') {
                className += 'correct';
              } else if (letter.result == 'misplaced') {
                className += 'misplaced';
              } else {
                className += 'incorrect';
              }
              return <li className={className}>{letter.letter}</li>;
            })}
          </ul>
        );
      })}
    </main>
  );
}

export default App;
