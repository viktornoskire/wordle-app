import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';
import GuessForm from './components/GuessForm.jsx';
import GuessList from './components/GuessList.jsx';

function App() {
  const [answers, setAnswers] = useState([]);

  return (
    <main>
      <SettingsForm
        onSubmit={() => {
          setAnswers([]);
        }}
      />
      <GuessForm
        onGuess={async response => {
          const { data } = await response.json();
          if (data.result == true) {
            setAnswers([...answers, data.obj]);
            console.log('yay');
          } else if (data.result == false) {
            console.log('nay');
          } else {
            setAnswers([...answers, data.obj]);
          }
        }}
      />
      <GuessList answers={answers} />
    </main>
  );
}

export default App;
