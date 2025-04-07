import { useState } from 'react';

function App() {
  const [chosen, setChosen] = useState('');
  const [guessed, setGuessed] = useState('');
  const [answers, setAnswers] = useState([]);

  return (
    <main>
      <button
        onClick={async () => {
          const response = await fetch('/api/word', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              charMount: 5,
              unique: true,
            }),
          });

          if (response.status == 200) {
            const payload = await response.json();
            const chosen = payload.word;

            setChosen(chosen);
          }
        }}>
        Start
      </button>

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
                chosen,
                guessed,
              }),
            });
            if (response.status == 201) {
              setGuessed('');
              const payload = await response.json();
              const data = payload.data;

              console.log(data);
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
