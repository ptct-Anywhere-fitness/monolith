import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

// ==============================================

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

// ==============================================

export default function SelectDate({setDate}) {

  // -------------------------------------------

  const classes = useStyles();

  // -------------------------------------------

  const [form_val, setFormVal] = useState('');

  // -------------------------------------------

  return (
    
    <form className={classes.container} noValidate onSubmit={e => {
      e.preventDefault();
      // -Parse the date:
      const parse_date = (date) => {
        // input: 'year-month-day'    (string)
        // output: {year,month,day}   (obj of ints)
        const [year, month, day] = date.split('-');
        return {year: Number(year), month: Number(month), day: Number(day)};
      };
      const date_obj = parse_date(form_val);
      setDate(date_obj);

      console.clear();
      console.log('date_obj: ', date_obj);
    }}>
      <TextField
        id="date"
        label="Choose Date"
        type="date"
        defaultValue="2022-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={form_val}
        onChange={e => {
          setFormVal(e.target.value);
        }}
      />

      <button>Save</button>
    </form>
  );
}

// ==============================================