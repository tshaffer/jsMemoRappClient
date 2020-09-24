
import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export interface SearchSpecPropsFromParent {
  onUpdateSearchBy: (searchBy: string) => any;
  onUpdateSearchTerm: (term: string) => any;
  onUpdateSearchLocation: (location: string) => any;
}

// export interface SearchSpecProps extends SearchSpecPropsFromParent {
// }

const SearchSpec = (props: SearchSpecPropsFromParent) => {

  const classes = useStyles();

  const [_searchBy, setSearchBy] = React.useState('currentLocation');
  const [_searchTerm, setSearchTerm] = React.useState('');
  const [_searchLocation, setSearchLocation] = React.useState('');

  const handleSearchByCurrentLocation = (event: any) => {
    console.log('SearchBy: ');
    console.log(event.target.value);
    setSearchBy('currentLocation');
    props.onUpdateSearchBy('currentLocation');
  };

  const handleSearchBySpecificLocation = (event: any) => {
    console.log('SearchBy: ');
    console.log(event.target.value);
    setSearchBy('specifyLocation');
    props.onUpdateSearchBy('specifyLocation');
  };

  const handleSearchTermChanged = (event: any) => {
    setSearchTerm(event.target.value);
    props.onUpdateSearchTerm(event.target.value);
  };

  const handleSearchLocationChanged = (event: any) => {
    setSearchLocation(event.target.value);
    props.onUpdateSearchLocation(event.target.value);
  };

  const getNullSearchTerm = () => {
    return null;
  }

  const getSearchTerm = () => {
    return (
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
    )
  };

  const getSpecifyLocation = () => {
    return (
      <div>
        {getNullSearchTerm()}
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
    );
  }
  return (

    <div>
      <div>Search Term</div>

      <div className={classes.container}>
        <div style={{ gridColumnEnd: 'span 12' }}>
          <Radio
            checked={_searchBy === 'currentLocation'}
            onChange={handleSearchByCurrentLocation}
            value='currentLocation'
            name='currentLocationRadioButton'
          />
            Current Location
          </div>
        <div style={{ gridColumnEnd: 'span 12' }}>
          <Radio
            checked={_searchBy === 'specifyLocation'}
            onChange={handleSearchBySpecificLocation}
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
            getSpecifyLocation()
          }
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators({
//     onSetSearchTags: setSearchTags,
//     onSearchForRestaurantsByGeoLocation: searchForRestaurantsByGeolocation,
//     onSearchForRestaurantsBySearchTerm: searchForRestaurantsBySearchTerm,
//   }, dispatch);
// };

export default connect(mapStateToProps)(SearchSpec);
