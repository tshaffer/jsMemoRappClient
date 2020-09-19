
import * as React from 'react';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHashHistory } from 'history';

import { HashRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
  searchForRestaurants
} from '../controllers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // pre grid styles, some unused
    root: {
      width: '100%',
    },
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
  }),
);

export interface RestaurantFinderProps {
  tags: TagEntity[];
  user: User;
  onSetSearchTags: (tags: string[]) => any;
  onSearchForRestaurants: (userName: string, locationSpec: GeoLocationSpec, tags: string[]) => any;
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

  const handleLocationChanged = (event: any) => {
    console.log('Location: ');
    console.log(event.target.value);
    setLocation(event.target.value);
  };

  const handleSearchByChanged = (event: any) => {
    console.log('SearchBy: ');
    console.log(event.target.value);
    setSearchBy(event.target.value);
  };

  const handleSearchTermChanged = (event: any) => {
    console.log('SearchTerm: ');
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSearchLocationChanged = (event: any) => {
    console.log('SearchLocation: ');
    console.log(event.target.value);
    setSearchLocation(event.target.value);
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

  const renderLocation = () => {
    return (
      <div className={classes.textField}>
        <TextField
          id='location'
          label='Location'
          defaultValue='Current Location'
          onChange={handleLocationChanged}
        />
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div>
        <div>Search Term</div>

        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <Radio
              checked={_searchBy === 'currentLocation'}
              onChange={handleSearchByChanged}
              value='currentLocation'
              name='currentLocationRadioButton'
            />
            Current Location
          </div>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <Radio
              checked={_searchBy === 'specifyLocation'}
              onChange={handleSearchByChanged}
              value='specifyLocation'
              name='specifyLocationRadioButton'
            />
            Specify Location
          </div>
          <div style={{ gridColumnEnd: 'span 12' }}>
            {(_searchBy === 'currentLocation')
              ?
              null
              :
              <div>
                <div>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    id='searchTerm'
                    label='Enter search term - optional'
                    name='searchTerm'
                    autoComplete='searchTerm'
                    onChange={handleSearchTermChanged}
                  />
                </div>
                <div>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    id='searchTerm'
                    label='Enter location'
                    name='searchLocation'
                    autoComplete='searchLocation'
                    onChange={handleSearchLocationChanged}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  };

  const handleSearch = () => {
    const geoLocationSpec: GeoLocationSpec = {
      coordinates: [UserConfiguration.currentLocation.longitude, UserConfiguration.currentLocation.latitude],
      maxDistance: 1500,
    };
    const tags: string[] = _tags.map((tagEntity: TagEntity) => {
      return tagEntity.value;
    });
    props.onSetSearchTags(tags);
    props.onSearchForRestaurants(props.user.userName, geoLocationSpec, tags);
    console.log('handleSearch');
    console.log('Tags: ');
    console.log(_tags);
    console.log('Location:');
    console.log(_location);

    const hashHistory = createHashHistory();
    hashHistory.push('/restaurantResults');
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Find Restaurant</h3>

        <div className={classes.container}>
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
    onSearchForRestaurants: searchForRestaurants,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFinder);
