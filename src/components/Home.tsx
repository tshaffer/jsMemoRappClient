import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { Link as RouterLink } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

/*
    // root: {
    //   width: '100%',
    // },
    // paper: {
    //   width: '100%',
    //   marginBottom: theme.spacing(2),
    // },
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            MemoRapp
          </Typography>
          <Link component={RouterLink} to='/restaurantFinder'>
            Find Restaurant
          </Link>
          <Link component={RouterLink} to='/restaurantReview'>
            Add Review
          </Link>
        </div>
      </Container>
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
