import {useState, useEffect} from 'react'

import css from './range-slider.module.scss';

// ==============================================

export default function RangeSlider() {

  // --------------------------------------------

  const [min, setMin] = useState('0');
  const [max, setMax] = useState('10');

  const MAX = 10;
  const MIN = 0;

  useEffect(() => {
    console.log('min: ', min, '\tmax: ', max);
  }, [min, max]);

  // --------------------------------------------
  
  return (
    <div className={css.container}>
      <input 
        type="range" 
        className={`${css.slider} ${css.slider_1}`} 
        value={min} 
        min={MIN}
        max={MAX}
        onChange={(e) => {

          console.clear();
          console.log('e.target.value: ', e.target.value);
          console.log('min: ', min);
          console.log('max: ', max);

          if (e.target.value < max && e.target.value != MAX) {
            setMin(e.target.value);
          } else {
            setMin((prev) => prev);
          }
        }}
        onClick={(e) => {
          console.clear();
          console.log('one, e.target: ', e.target, ', e.currentTarget: ', e.currentTarget);
        }}
      />

      <br />

      <input 
        type="range" 
        className={`${css.slider} ${css.slider_2}`}
        value={max}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          if (min < e.target.value)
            setMax(e.target.value)
          else {
            setMax((prev) => prev);
          }
        }}

      />



    </div>
  );

  // --------------------------------------------
}