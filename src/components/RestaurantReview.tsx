import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import {
  RestaurantsResponse,
  Restaurant
} from '../types/base';
import {
  addRestaurantToRedux,
  fetchAllRestaurantsByLocation,
  setSelectedRestaurantInRedux,
} from '../controllers';
import {
  getRestaurants,
  getSelectedRestaurant
} from '../selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    margin: {
      marginLeft: '42px',
    },
    topMargin: {
      marginTop: '16px',
    },
    quarterWidth: {
      width: '25%',
    },
    formControl: {
      margin: theme.spacing(1),
      marginTop: '16px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export interface RestaurantReviewProps {
  restaurants: Restaurant[];
  onAddRestaurant: (restaurant: Restaurant) => any;
  onSetSelectedRestaurant: (selectedRestaurant: Restaurant) => any;
  selectedRestaurant: Restaurant;
}

const RestaurantReview = (props: RestaurantReviewProps) => {

  const classes = useStyles();

  const [restaurant, setRestaurant] = React.useState('');
  const [restaurantLocation, setRestaurantLocation] = React.useState('specifyLocation');
  const [longitude, setLongitude] = React.useState(-122.115733);
  const [latitude, setLatitude] = React.useState(37.380557);

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

  const handleSelectRestaurant = (e: any) => {
    console.log('handleSelectRestaurant');
    console.log(e.target.value);
    setRestaurant(e.target.value);
    props.onSetSelectedRestaurant(e.target.value);
  };

  const handleFindRestaurant = () => {

    if (restaurantLocation === 'specifyLocation') {

      fetchAllRestaurantsByLocation(latitude, longitude)
        .then((restaurantsResponse: RestaurantsResponse) => {

          if (restaurantsResponse.success) {
            const addedRestaurantNames: string[] = [];

            // add memoRappRestaurants
            for (const memoRappRestaurant of restaurantsResponse.memoRappRestaurants) {
              const name = memoRappRestaurant.name;
              onAddRestaurant(memoRappRestaurant);
              addedRestaurantNames.push(name);
            }
            // add yelpRestaurants
            for (const yelpRestaurant of restaurantsResponse.yelpRestaurants) {
              const memoRappRestaurant: Restaurant = {
                id: yelpRestaurant.id,
                _id: null,
                name: yelpRestaurant.name,
                yelpBusinessDetails: yelpRestaurant,
                usersReviews: [],
                location: {
                  type: 'Point',
                  coordinates: yelpRestaurant.coordinates as any,
                },
                dist: {
                  calculated: yelpRestaurant.distance,
                  location: {
                    type: 'Point',
                    coordinates: yelpRestaurant.coordinates as any,
                  }
                },
              };
              const name = yelpRestaurant.name;
              if (addedRestaurantNames.indexOf(name) < 0) {
                onAddRestaurant(memoRappRestaurant);
                addedRestaurantNames.push(name);
              }
            }
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  };

  const getRestaurantMenuItems = () => {
    return props.restaurants.map((restaurantItem) => {
      const name = restaurantItem.name;
      return <MenuItem value={restaurantItem as any} key={name}>{name}</MenuItem>;
    });
  };

  const restaurantMenuItems: any[] = getRestaurantMenuItems();

  console.log(props.selectedRestaurant);

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

          <div>
            {(props.restaurants.length === 0)
              ?
              null
              :
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-label'>Restaurants</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={restaurant}
                    onChange={handleSelectRestaurant}
                  >
                    {restaurantMenuItems}
                  </Select>
                </FormControl>
                {(isNil(props.selectedRestaurant))
                  ?
                  null
                  :
                  <div>
                    <Link component={RouterLink} to={'/addReview/' + props.selectedRestaurant.name}>
                      Add Review
                    </Link>
                  </div>
                }
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
    selectedRestaurant: getSelectedRestaurant(state),
    restaurants: getRestaurants(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onAddRestaurant: addRestaurantToRedux,
    onSetSelectedRestaurant: setSelectedRestaurantInRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
