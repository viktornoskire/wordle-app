export default function GuessList({ answers }) {
  return (
    <div className='guess--list'>
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
    </div>
  );
}
