import { useState } from 'react';

export default function SettingsForm({ onSubmit }) {
  const [amount, setAmount] = useState(0);
  const [unique, setUnique] = useState(false);
  const [error, setError] = useState(false);

  let settingClass = 'user-form';

  if (error) {
    settingClass += ' error-active';
  }

  return (
    <form
      className={settingClass}
      onSubmit={async e => {
        e.preventDefault();
        if (!isNaN(amount)) {
          const response = await fetch('/api/word', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              charMount: amount,
              unique: unique,
            }),
          });

          if (response.status == 200) {
            console.log('ok');
            onSubmit();
          } else {
            setError(true);
            return;
          }
        } else {
          setError(true);
        }
      }}>
      <label htmlFor='charMount'>Amount of characters</label>
      <input
        type='text'
        className='charMount'
        onChange={e => {
          if (error) {
            setError(false);
          }
          setAmount(Number(e.target.value));
        }}
      />
      <small className='user-error'>Enter valid number</small>
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
        }}
      />
      <button>Start</button>
    </form>
  );
}
