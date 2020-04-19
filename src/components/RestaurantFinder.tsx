import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHashHistory } from 'history';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableColumnNarrowWidth: {
      width: '32px',
    },
    tableColumnMediumWidth: {
      width: '64px',
    },
    tableColumnWideWidth: {
      width: '192px',
    },
    tableButtonColumnWidth: {
      width: '48px',
    },
  }),
);

export interface RestaurantFinderProps {
}

const RestaurantFinder = (props: RestaurantFinderProps) => {

  const classes = useStyles();

  const getTags = () => {
    return (
      <div>
        <Autocomplete
          multiple
          id='tags-standard'
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[1]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              label='Multiple values'
              placeholder='Favorites'
            />
          )}
        />
      </div>
    );
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>RestaurantFinder</h3>
        {getTags()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFinder);
