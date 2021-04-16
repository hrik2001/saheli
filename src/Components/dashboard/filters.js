import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import './dashboard.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
 <div className="filter">

    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Location distance</InputLabel>
        <NativeSelect
          value={state.location}
          onChange={handleChange}
          inputProps={{
            name: 'location',
            id: 'age-native-helper',
          }}
        >
          <option value={10}>0-2 km</option>
          <option value={20}>2-5 km</option>
          <option value={30}>5-7 km</option>
        </NativeSelect>
        <FormHelperText>Preferrable Location distance</FormHelperText>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Age group</InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: '',
          }}
        >
          <option value={10}>15-20</option>
          <option value={20}>20-30</option>
          <option value={30}>30-40</option>
        </NativeSelect>
        <FormHelperText>Preferrable age group</FormHelperText>
      </FormControl>

    </div>

    <Button variant="contained" className="find_button" color="primary">Find Saheli</Button>

</div>
  );
}