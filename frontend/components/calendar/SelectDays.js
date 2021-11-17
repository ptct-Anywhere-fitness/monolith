import React, {useState} from 'react'

// ==============================================

export default function SelectDate({setDays}) {

  // -------------------------------------------

  const [form_val, setFormVal] = useState('');

  // -------------------------------------------

  return (
    <label>
      Choose # of additional days:
      <select value={form_val} onChange={(e) => {
        setFormVal(e.target.value);
        setDays(Number(e.target.value));
      }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </label>
  );
}

// ==============================================