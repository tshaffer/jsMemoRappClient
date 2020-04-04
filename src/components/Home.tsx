import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHashHistory } from 'history';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export interface HomeProps {
}

const Home = (props: HomeProps) => {

  const classes = useStyles();

  const handleFindRestaurant = () => {
    console.log('handleFindRestaurant');
  }

  const handleAddReview = () => {
    console.log('handleAddReview');
  }

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={e => handleFindRestaurant()}
        >
          Find Restaurant
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={e => handleAddReview()}
        >
          Add Review
        </Button>
      </div>
      <div>

      </div>
    </HashRouter>
  );
}

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
