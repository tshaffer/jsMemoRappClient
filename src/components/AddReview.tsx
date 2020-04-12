import clsx from 'clsx';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

interface AddReviewProps {
  restaurantName: string;
}

const AddReview = (props: AddReviewProps) => {

  const classes = useStyles();

  console.log('Add Review');
  console.log(props.restaurantName);

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Login</h3>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(ownProps: any) {
  return {
    restaurantName: ownProps.match.params.restaurantName,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
