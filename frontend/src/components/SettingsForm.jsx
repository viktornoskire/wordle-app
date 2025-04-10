import { useState } from 'react';

export default function SettingsForm({ onSubmit }) {
  const [amount, setAmount] = useState(0);
  const [unique, setUnique] = useState(false);
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        onSubmit();
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
        } else {
          console.log('no');
        }
      }}>
      <label htmlFor='charMount'>Amount of characters</label>
      <input
        type='text'
        className='charMount'
        onChange={e => {
          setAmount(Number(e.target.value));
        }}
      />
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
