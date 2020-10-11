
import * as React from 'react';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHashHistory } from 'history';

import { HashRouter } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import SearchSpec from './SearchSpec';

import {
  getMemoRappTags,
  getUser,
} from '../selectors';
import { TagEntity, User, GeoLocationSpec } from '../types';
import { UserConfiguration } from '../config/config';

import {
  setSearchTags,
} from '../models';

import {
  searchForRestaurantsByGeolocation,
  searchForRestaurantsBySearchTerm,
} from '../controllers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // pre grid styles, some unused
    // root: {
    //   width: '100%',
    // },
    // paper: {
    //   width: '100%',
    //   marginBottom: theme.spacing(2),
    // },
    quarterWidth: {
      width: '25%',
    },
    textField: {
      marginTop: '16px',
      width: '50ch',
    },
    // grid styles added, some unused
    // gridGap: theme.spacing(1),
    findContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      minWidth: '375px',
    },
    // paper: {
    //   padding: theme.spacing(1),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    //   whiteSpace: 'nowrap',
    //   marginBottom: theme.spacing(1),
    // },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    subTitle: {
      marginBottom: '0px',
    }
  }),
);

export interface RestaurantFinderProps {
  tags: TagEntity[];
  user: User;
  onSetSearchTags: (tags: string[]) => any;
  onSearchForRestaurantsByGeoLocation: (userName: string, locationSpec: GeoLocationSpec, tags: string[]) => any;
  onSearchForRestaurantsBySearchTerm: (userName: string, location: string, term: string, tags: string[]) => any;
}

const RestaurantFinder = (props: RestaurantFinderProps) => {

  const classes = useStyles();

  const [_searchBy, setSearchBy] = React.useState('currentLocation');
  const [_searchTerm, setSearchTerm] = React.useState('');
  const [_searchLocation, setSearchLocation] = React.useState('');

  const [_location, setLocation] = useState('Current Location');
  const [_tags, setTags] = useState([]);

  const handleTagsChanged = (event: object, value: any, reason: string) => {
    console.log('handleTagsChanged:');
    console.log(value);
    setTags(value);
  };

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

  const renderTags = () => {
    const tagOptions = props.tags;
    return (
      <div>
        <Autocomplete
          multiple
          id='tags-standard'
          options={tagOptions}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              label='Restaurant tags'
              placeholder='Tag'
            />
          )}
          onChange={handleTagsChanged}
        />
      </div>
    );
  };

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

  function error() {
    alert('Unable to retrieve your location');
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoLocationSpec: GeoLocationSpec = {
      coordinates: [longitude, latitude],
      maxDistance: 1500,
    };
    const tags: string[] = _tags.map((tagEntity: TagEntity) => {
      return tagEntity.value;
    });
    props.onSetSearchTags(tags);
    props.onSearchForRestaurantsByGeoLocation(props.user.userName, geoLocationSpec, tags);
    console.log('onSearchForRestaurantsByGeoLocation');
    console.log('Tags: ');
    console.log(_tags);
    console.log('Location:');
    console.log(_location);

    const hashHistory = createHashHistory();
    hashHistory.push('/restaurantResults');
  }

  const handleSearch = () => {
    if (_searchBy === 'currentLocation') {

      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        console.log('getCurrentPosition');
        navigator.geolocation.getCurrentPosition(success, error);
      }

      // const geoLocationSpec: GeoLocationSpec = {
      //   coordinates: [UserConfiguration.currentLocation.longitude, UserConfiguration.currentLocation.latitude],
      //   maxDistance: 1500,
      // };
      // const tags: string[] = _tags.map((tagEntity: TagEntity) => {
      //   return tagEntity.value;
      // });
      // props.onSetSearchTags(tags);
      // props.onSearchForRestaurantsByGeoLocation(props.user.userName, geoLocationSpec, tags);
      // console.log('onSearchForRestaurantsByGeoLocation');
      // console.log('Tags: ');
      // console.log(_tags);
      // console.log('Location:');
      // console.log(_location);

      // const hashHistory = createHashHistory();
      // hashHistory.push('/restaurantResults');

    } else {
      const tags: string[] = _tags.map((tagEntity: TagEntity) => {
        return tagEntity.value;
      });
      // TEDTODO - figure out better place to do this.
      const yelpCategories: string[] = _tags.map((tagEntity: TagEntity) => {
        switch (tagEntity.value) {
          case 'Taqueria':
            return 'Tacos';
          case 'Burritos':
            return 'Mexican';
          case 'Meatball Sandwiches':
            return 'Meatballs';
          case 'Pasta':
            return 'Italian';
          case 'Coffee':
          case 'Pizza':
          case 'Sandwiches':
            return tagEntity.value;
          default:
            return 'Restaurants';
        }
      });
      props.onSetSearchTags(tags);
      props.onSearchForRestaurantsBySearchTerm(props.user.userName, _searchLocation, _searchTerm, yelpCategories);
      console.log('onSearchForRestaurantsBySearchTerm');
      console.log('Tags: ');
      console.log(_tags);
      console.log('Search Location:');
      console.log(_searchLocation);
      console.log('Search Term:');
      console.log(_searchTerm);

      const hashHistory = createHashHistory();
      hashHistory.push('/restaurantResults');
    }
  };

  return (
    <HashRouter>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            MemoRapp
          </Typography>
          <Typography>
            Find Restaurant
          </Typography>
          <div className={classes.findContainer}>
            <div style={{ gridColumnEnd: 'span 12' }}>
              <div>
                {renderTags()}
                {renderSearch()}
              </div>
              <Button
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleSearch}
              >
                Search
          </Button>
            </div>
          </div>
        </div>
      </Container>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
    tags: getMemoRappTags(state),
    user: getUser(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetSearchTags: setSearchTags,
    onSearchForRestaurantsByGeoLocation: searchForRestaurantsByGeolocation,
    onSearchForRestaurantsBySearchTerm: searchForRestaurantsBySearchTerm,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFinder);
