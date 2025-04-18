import { useState } from 'react';

export default function UserInfo({ answers, onSubmit }) {
  const [user, setUser] = useState('');
  const [error, setError] = useState(false);

  let userPage = 'user-form';

  if (error) {
    userPage += ' error-active';
  }

  return (
    <form className={userPage}>
      <p className='usernameTitle'>Enter your username</p>
      <input
        className='usernameInput'
        type='text'
        placeholder='Your username...'
        onChange={e => {
          if (error) {
            setError(false);
          }
          setUser(e.target.value);
        }}
      />
      <small className='user-error'>Invalid username</small>
      <button
        className='usernameConfirm'
        onClick={async e => {
          e.preventDefault();
          if (user.length > 0) {
            const response = await fetch('/api/user-info', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user,
                guesses: answers.length,
              }),
            });
            const payload = await response.json();
            if (payload.completed == true) {
              onSubmit();
            } else {
              setError(true);
            }
          } else {
            setError(true);
          }
        }}>
        Confirm
      </button>
    </form>
  );
}
