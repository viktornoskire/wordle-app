import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';
import GuessForm from './components/GuessForm.jsx';
import GuessList from './components/GuessList.jsx';

function App() {
  const [window, setWindow] = useState('start');
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState('');

  if (window == 'start') {
    return (
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
              }),
            });
            setWindow('start');
          }}>
          Go to main menu
        </button>
      </main>
    );
  }
}

export default App;
