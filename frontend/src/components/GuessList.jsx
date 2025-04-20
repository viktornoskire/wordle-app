export default function GuessList({ answers }) {
  return (
    <div className='play--page_guess--list'>
      {answers.map(answer => {
        return (
          <ul>
            {answer.map(letter => {
              let className = 'guess--list_letter ';
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
