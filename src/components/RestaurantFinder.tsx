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
import { getMemoRappTags } from '../selectors';
import { TagEntity } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    quarterWidth: {
      width: '25%',
    },
  }),
);

export interface RestaurantFinderProps {
  tags: TagEntity[];
}

const RestaurantFinder = (props: RestaurantFinderProps) => {

  const classes = useStyles();

  const flibbet = (event: object, value: any, reason: string) => {
    console.log('flibbet');
    console.log(event);
    console.log(value); // array of values
    console.log(reason);
  };

  const getTagOptions = () => {
    return props.tags;
  };

  const getTags = () => {
    const tagOptions = getTagOptions();
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
          onChange={flibbet}
        />
      </div>
    );
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>RestaurantFinder</h3>
        <div className={classes.quarterWidth}>
          {getTags()}
        </div>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
    tags: getMemoRappTags(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFinder);
