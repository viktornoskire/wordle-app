import { useState } from 'react';

export default function SettingsForm({ onSubmit }) {
  const [amount, setAmount] = useState(0);
  const [unique, setUnique] = useState(false);
  const [error, setError] = useState(false);

  let settingClass = 'user--form';

  if (error) {
    settingClass += ' error--active';
  }

  return (
    <form
      className={'start--page ' + settingClass}
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
            onSubmit();
          } else {
            setError(true);
            return;
          }
        } else {
          setError(true);
        }
      }}>
      <input
        type='text'
        placeholder='No. letters'
        className='user--form_letter--amount'
        onChange={e => {
          if (error) {
            setError(false);
          }
          setAmount(Number(e.target.value));
        }}
      />
      <small className='user--error'>Enter valid number</small>
      <div className='user--form_unique--letters'>
        <label className='unique--letters_label' htmlFor='unique--letters_checkbox'>
          Unique
          <br />
          letters
        </label>
        <input
          type='checkbox'
          className='unique--letters_checkbox'
          onChange={() => {
            if (unique) {
              setUnique(false);
            } else {
              setUnique(true);
            }
          }}
        />
      </div>
      <button className='user--form_play--button'>Play</button>
    </form>
  );
}
