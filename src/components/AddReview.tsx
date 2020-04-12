import clsx from 'clsx';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// import {
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import { getRestaurantByName } from '../selectors';
import { Restaurant } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  input: {
    width: 42,
  },
  quarterWidth: {
    width: '25%',
  },
}));

interface AddReviewProps {
  restaurantName: string;
  restaurant: Restaurant | null;
}

const AddReview = (props: AddReviewProps) => {

  const classes = useStyles();

  const [value, setValue] = React.useState<number | string | Array<number | string>>(5.0);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddReview = (e: any) => {
  }

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleWouldReturnChecked = (event: any) => {
    console.log('Would return: ' + event.target.checked);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleAddReview(e);
  };

  /*
            <Typography id='input-slider' gutterBottom>
              Rating
            </Typography>
  */

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Add Review</h3>
        <h4>{props.restaurantName}</h4>
        <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
          {/* <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label='Date picker dialog'
            format='MM/dd/yyyy'
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          /> */}

          <div className={classes.quarterWidth}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <span className={classes.margin}>Rating</span>
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={value}
                  margin='dense'
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    'step': .1,
                    'min': 0,
                    'max': 10,
                    'type': 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  min={0}
                  max={10}
                  step={.1}
                  onChange={handleSliderChange}
                  aria-labelledby='input-slider'
                />
              </Grid>
            </Grid>
            <div>
              <FormControlLabel
                value='end'
                control={<Checkbox color='primary' />}
                label='Would return'
                labelPlacement='end'
                onChange={handleWouldReturnChecked}
              />
            </div>
          </div>

        </form>
        <div>
          <Button
            type='submit'
            variant='contained'
            className={clsx(classes.margin)}
          >
            Add Review
          </Button>

        </div>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    restaurantName: ownProps.match.params.restaurantName,
    restaurant: getRestaurantByName(state, ownProps.match.params.restaurantName),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
