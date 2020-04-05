import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  margin: {
    marginLeft: '42px',
  },
});

export interface RestaurantReviewProps {
}

const RestaurantReview = (props: RestaurantReviewProps) => {

  const classes = useStyles();

  const [restaurantLocation, setRestaurantLocation] = React.useState('currentLocation');
  const [longitude, setLongitude] = React.useState('');
  const [latitude, setLatitude] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantLocation(event.target.value);
  };

  const handleLongitudeChange = (e: any) => {
    setLongitude(e.target.value);
  };

  const handleLatitudeChange = (e: any) => {
    setLatitude(e.target.value);
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
          <div className={classes.margin}>
            {(restaurantLocation === 'currentLocation')
              ?
              null
              :
              <div>
                <div>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    id='longitude'
                    label='Longitude'
                    name='longitude'
                    autoComplete='longitude'
                    onChange={handleLongitudeChange}
                  />
                </div>
                <div>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    id='latitude'
                    label='Latitude'
                    name='latitude'
                    autoComplete='latitude'
                    onChange={handleLatitudeChange}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
