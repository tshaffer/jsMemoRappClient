import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export interface RestaurantReviewProps {
}

const RestaurantReview = (props: RestaurantReviewProps) => {

  const classes = useStyles();

  const [restaurantLocation, setRestaurantLocation] = React.useState('currentLocation');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantLocation(event.target.value);
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Add Restaurant Review</h3>
        <div>
          <div>Location of restaurant</div>
          <div>
            <Radio
              checked={restaurantLocation === 'currentLocation'}
              onChange={handleChange}
              value='currentLocation'
              name='radio-button-demo'
            />
            Current Location
          </div>
          <div>
            <Radio
              checked={restaurantLocation === 'specifyLocation'}
              onChange={handleChange}
              value='specifyLocation'
              name='radio-button-demo'
            />
            Specify Location
          </div>
          <div>
            Flibbet
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

/*
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Location</FormLabel>
          <RadioGroup defaultValue='female' aria-label='gender' name='customized-radios'>
            <FormControlLabel value='female' control={<StyledRadio />} label='Current Location' />
            <FormControlLabel value='male' control={<StyledRadio />} label='Male' />
            <FormControlLabel
              value='other'
              control={<StyledRadio />}
              label='Other'
            >
              <div>pizza eater</div>
            </FormControlLabel>
            <FormControlLabel
              value='disabled'
              disabled
              control={<StyledRadio />}
              label='(Disabled option)'
            >
              <div>pizza</div>
            </FormControlLabel>
          </RadioGroup>
        </FormControl>
*/

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
