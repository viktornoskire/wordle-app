import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';
import GuessForm from './components/GuessForm.jsx';
import GuessList from './components/GuessList.jsx';
import Header from './components/Header.jsx';
import HeaderWinner from './components/HeaderWinner.jsx';
import Rules from './components/Rules.jsx';
import UserInfo from './components/UserInfo.jsx';

function App() {
  const [window, setWindow] = useState('start');
  const [answers, setAnswers] = useState([]);

  return (
    <div className='game'>
      {window == 'start' || window == 'playing' ? <Header /> : <HeaderWinner />}
      {window == 'start' ? (
        <main className='startPage'>
          <Rules />
          <small>Customize the word</small>
          <SettingsForm
            onSubmit={() => {
              setAnswers([]);
              setWindow('playing');
            }}
          />
          <div className='directionBtns'>
            <button className='highscoreBtn'>
              <a href='/highscores'>Highscores</a>
            </button>
            <button className='aboutButton'>
              <a href='/about'>About</a>
            </button>
          </div>
        </main>
      ) : window == 'playing' ? (
        <main className='playPage'>
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
          <button
            className='backToStart'
            onClick={() => {
              setWindow('start');
              setAnswers([]);
            }}>
            Back to start
          </button>
        </main>
      ) : (
        <main className='winPage'>
          <p>You guessed the word in {answers.length} tries!</p>
          <GuessList className='winningGuess' answers={answers} />
          <UserInfo
            answers={answers}
            onSubmit={() => {
              setWindow('start');
            }}
          />
        </main>
      )}
    </div>
  );
}

export default App;
