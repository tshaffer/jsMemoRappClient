import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import SearchSpec from './SearchSpec';

import {
  RestaurantsResponse,
  Restaurant
} from '../types/base';
import {
  addRestaurantToRedux,
  fetchAllRestaurantsByLocation,
  fetchAllRestaurantsBySearchTerm,
  setSelectedRestaurantInRedux,
} from '../controllers';
import {
  getRestaurants,
  getSelectedRestaurant
} from '../selectors';
import { UserConfiguration } from '../config/config';

const useStyles = makeStyles((theme) => ({
  // pre grid styles, some unused
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
  // grid styles added, some unused
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export interface RestaurantReviewProps {
  restaurants: Restaurant[];
  onAddRestaurant: (restaurant: Restaurant) => any;
  onSetSelectedRestaurant: (selectedRestaurant: Restaurant) => any;
  selectedRestaurant: Restaurant;
}

const RestaurantReview = (props: RestaurantReviewProps) => {

  const classes = useStyles();

  const [_searchBy, setSearchBy] = React.useState('currentLocation');
  const [_searchTerm, setSearchTerm] = React.useState('');
  const [_searchLocation, setSearchLocation] = React.useState('');

  const [_restaurant, setRestaurant] = React.useState('');
  // const [_restaurantLocation, setRestaurantLocation] = React.useState('specifyLocation');
  const [_longitude, setLongitude] = React.useState(UserConfiguration.currentLocation.longitude);
  const [_latitude, setLatitude] = React.useState(UserConfiguration.currentLocation.latitude);

  const { onAddRestaurant } = props;

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRestaurantLocation(event.target.value);
  // };

  const handleSearchByChanged = (searchBy: string) => {
    console.log('SearchBy: ');
    console.log(searchBy);
    setSearchBy(searchBy);
  };

  const handleSearchTermChanged = (term: string) => {
    console.log('SearchTerm: ');
    console.log(term);
    setSearchTerm(term);
  };

  const handleSearchLocationChanged = (location: string) => {
    console.log('SearchLocation: ');
    console.log(location);
    setSearchLocation(location);
  };


  const handleSelectRestaurant = (e: any) => {
    console.log('handleSelectRestaurant');
    console.log(e.target.value);
    setRestaurant(e.target.value);
    props.onSetSelectedRestaurant(e.target.value);
  };

  const handleFindRestaurant = () => {

    if (_searchBy === 'currentLocation') {

      fetchAllRestaurantsByLocation(_latitude, _longitude)
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
                  coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
                },
                dist: {
                  calculated: yelpRestaurant.distance,
                  location: {
                    type: 'Point',
                    coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
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
    } else {
      fetchAllRestaurantsBySearchTerm(_searchLocation, _searchTerm)
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
                  coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
                },
                dist: {
                  calculated: yelpRestaurant.distance,
                  location: {
                    type: 'Point',
                    coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
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

  /*
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <Radio
              checked={_restaurantLocation === 'currentLocation'}
              onChange={handleChange}
              value='currentLocation'
              name='currentLocationRadioButton'
            />
            Current Location
          </div>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <Radio
              checked={_restaurantLocation === 'specifyLocation'}
              onChange={handleChange}
              value='specifyLocation'
              name='specifyLocationRadioButton'
            />
            Specify Location
          </div>
          <div style={{ gridColumnEnd: 'span 12' }}>
            {(_restaurantLocation === 'currentLocation')
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
        </div>
  */

  const renderSearch = () => {
    return (
      <div>
        <SearchSpec
          onUpdateSearchBy={handleSearchByChanged}
          onUpdateSearchLocation={handleSearchLocationChanged}
          onUpdateSearchTerm={handleSearchTermChanged}
        />
      </div>
    );
  };

  return (

    <HashRouter>

      <div>
        <h2>MemoRapp</h2>
        <h3>Add Restaurant Review</h3>
        <div>Location of restaurant</div>
        {renderSearch()}

        <div style={{ gridColumnEnd: 'span 12' }}>
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
        <div style={{ gridColumnEnd: 'span 12' }}>
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
                  value={_restaurant}
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
                  <Link component={RouterLink} to={'/addReview/' + props.selectedRestaurant.id}>
                    Add Review
                    </Link>
                </div>
              }
            </div>
          }
        </div>
      </div >
    </HashRouter >
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
