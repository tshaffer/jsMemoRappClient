import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { Link as RouterLink } from 'react-router-dom';

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

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
      </div>
      <div>
      <Link component={RouterLink} to='/restaurantFinder'>
        Find Restaurant
      </Link>
      </div>
      <div>
      <Link component={RouterLink} to='/restaurantReview'>
        Add Review
      </Link>
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
