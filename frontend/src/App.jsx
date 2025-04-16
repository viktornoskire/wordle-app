import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';
import GuessForm from './components/GuessForm.jsx';
import GuessList from './components/GuessList.jsx';
import Header from './components/Header.jsx';
import HeaderWinner from './components/HeaderWinner.jsx';
import Rules from './components/Rules.jsx';

function App() {
  const [window, setWindow] = useState('start');
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState('');

  return (
    <div className='game'>
      {window == 'start' || window == 'playing' ? <Header /> : <HeaderWinner />}
      {window == 'start' ? (
        <main>
          <Rules />
          <h2>Settings</h2>
          <SettingsForm
            onSubmit={() => {
              setAnswers([]);
              setWindow('playing');
            }}
          />
          <a href='/highscores'>Highscores</a>
          <a href='/about'>About</a>
        </main>
      ) : window == 'playing' ? (
        <main>
          <h2>Make your guess</h2>
          <GuessForm
            onGuess={async data => {
              if (data.result == true) {
                setAnswers([...answers, data.obj]);
                setWindow('won');
              } else if (data.result == null) {
                setAnswers([...answers, data.obj]);
              }
            }}
          />
          <GuessList answers={answers} />
        </main>
      ) : (
        <main>
          <input
            type='text'
            placeholder='Skriv ditt namn'
            onChange={e => {
              setUser(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response = fetch('/api/user-info', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user,
                  guesses: answers.length,
                }),
              });
              setWindow('start');
            }}>
            Go to main menu
          </button>
        </main>
      )}
    </div>
  );
  /* 
  if (window == 'start') {
    return (
      <div className='doc'>
        <Header />
        <main>
          <h2>Settings</h2>
          <SettingsForm
            onSubmit={() => {
              setAnswers([]);
              setWindow('playing');
            }}
          />
          <a href='/highscores'>Highscores</a>
          <a href='/about'>About</a>
        </main>
      </div>
    );
  } else if (window == 'playing') {
    return (
      <main>
        <h2>Make your guess</h2>
        <GuessForm
          onGuess={async response => {
            const { data } = await response.json();
            if (data.result == true) {
              setAnswers([...answers, data.obj]);
              setWindow('end');
            } else if (data.result == false) {
            } else {
              setAnswers([...answers, data.obj]);
            }
          }}
        />
        <GuessList answers={answers} />
      </main>
    );
  } else {
    return (
      <main>
        <h2>You Won!</h2>
        <input
          type='text'
          placeholder='Skriv ditt namn'
          onChange={e => {
            setUser(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            const response = fetch('/api/user-info', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user,
                guesses: answers.length,
              }),
            });
            setWindow('start');
          }}>
          Go to main menu
        </button>
      </main>
    );
  } */
}

export default App;
