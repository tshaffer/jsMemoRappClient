import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import {
  findRestaurantsByLocation,
} from '../controllers/restaurants';
import { addRestaurant } from '../models/restaurants';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  margin: {
    marginLeft: '42px',
  },
  quarterWidth: {
    width: '25%',
  }
});

export interface RestaurantReviewProps {
  onAddRestaurant: (name: string, data: any) => any;
}

const RestaurantReview = (props: RestaurantReviewProps) => {

  const classes = useStyles();

  const [restaurantLocation, setRestaurantLocation] = React.useState('currentLocation');
  const [longitude, setLongitude] = React.useState(0);
  const [latitude, setLatitude] = React.useState(0);

  const { onAddRestaurant } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantLocation(event.target.value);
  };

  const handleLongitudeChange = (e: any) => {
    setLongitude(e.target.value);
  };

  const handleLatitudeChange = (e: any) => {
    setLatitude(e.target.value);
  };

  const handleFindRestaurant = () => {
    console.log('handleFindRestaurant');

    console.log('restaurant location: ', restaurantLocation);
    if (restaurantLocation === 'specifyLocation') {
      console.log('Latitude: ', latitude);
      console.log('Longitude: ', longitude);

      findRestaurantsByLocation(latitude, longitude)
        .then((restaurants: any) => {
          console.log(restaurants);
          
          // check restaurants.success

          const addedRestaurantNames: string[] = [];

          debugger;

          // add memoRappRestaurants
          for (const memoRappRestaurant of restaurants.memoRappRestaurantData.restaurants) {
            const restaurantName = memoRappRestaurant.restaurantName;
            onAddRestaurant(restaurantName, memoRappRestaurant);
            addedRestaurantNames.push(restaurantName);
          }
          // add yelpRestaurants
          for (const yelpRestaurant of restaurants.yelpRestaurantData.businesses) {
            const restaurantName = yelpRestaurant.name;
            if (addedRestaurantNames.indexOf(restaurantName) < 0) {
              onAddRestaurant(restaurantName, yelpRestaurant);
              addedRestaurantNames.push(restaurantName);
            }
          }

          console.log('all added');

        }).catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Add Restaurant Review</h3>
        <div className={classes.quarterWidth}>
          <div>Location of restaurant</div>
          <div>
            <Radio
              checked={restaurantLocation === 'currentLocation'}
              onChange={handleChange}
              value='currentLocation'
              name='currentLocationRadioButton'
            />
            Current Location
          </div>
          <div>
            <Radio
              checked={restaurantLocation === 'specifyLocation'}
              onChange={handleChange}
              value='specifyLocation'
              name='specifyLocationRadioButton'
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
                    id='latitude'
                    label='Latitude'
                    name='latitude'
                    autoComplete='latitude'
                    onChange={handleLatitudeChange}
                  />
                </div>
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
              </div>
            }
          </div>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleFindRestaurant}
          >
            Find Restaurant
          </Button>
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
    onAddRestaurant: addRestaurant,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
