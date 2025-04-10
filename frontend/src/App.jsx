import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';
import GuessForm from './components/GuessForm.jsx';
import GuessList from './components/GuessList.jsx';

function App() {
  const [window, setWindow] = useState('start');
  const [answers, setAnswers] = useState([]);

  if (window == 'start') {
    return (
      <main>
        <SettingsForm
          onSubmit={() => {
            setAnswers([]);
            setWindow('playing');
          }}
        />
      </main>
    );
  } else if (window == 'playing') {
    return (
      <main>
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
        <h2>Du vann!</h2>
        <input type='text' placeholder='Skriv ditt namn' />
        <button
          onClick={() => {
            setWindow('start');
          }}>
          Gå till huvudmeny
        </button>
      </main>
    );
  }
}

export default App;
