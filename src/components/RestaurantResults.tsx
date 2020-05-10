import { isNil, isEmpty } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { Restaurant, RestaurantSearchResults, Review } from '../types';
import {
  getSearchTags,
  getSearchResults,
} from '../selectors';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indent0: {
      marginLeft: '16px',
    },
    indent1: {
      marginLeft: '32px',
    },
    indent2: {
      marginLeft: '64px',
    }
  }),
);

export interface RestaurantResultsProps {
  id: string;
  searchTags: string[];
  searchResults: RestaurantSearchResults | {};
}

const RestaurantResults = (props: RestaurantResultsProps) => {

  const classes = useStyles();

  const handleFilterResults = (event: any) => {
    console.log('navigate to filterSearchResults');
  };

  const renderSearchTags = () => {
    return (
      <div>
        <h4>Search Tags</h4>
        {
          props.searchTags.map((searchTag: string) => {
            return (
              <div className={classes.indent0}>{searchTag}</div>
            );
          })
        }
      </div>
    );
  };

  const renderMemoRappReview = (review: Review, index: number) => {
    return (
      <div className={classes.indent2} key={index}>
        <br />
        Date: {(new Date(review.date)).toDateString()}
        <br />
        Rating: {review.rating}
        <br />
        Would return:
        {
          review.wouldReturn
            ? ' Yes'
            : ' No'
        }
        <br />
        Comments: {review.comments}
        <br />
      </div>
    );
  };

  const renderMemoRappRestaurant = (memoRappRestaurant: Restaurant) => {

    let distance: number;
    let distanceLabel: string;
    if (!isNil(memoRappRestaurant.dist)) {
      distanceLabel = ' feet away';
      distance = memoRappRestaurant.dist.calculated * 3.28084;
      if (distance > (5280 / 2)) {
        distanceLabel = ' miles away';
        distance = distance / 5280;
      }
    }

    return (
      <div className={classes.indent0} key={memoRappRestaurant.name}>
        <h5>{memoRappRestaurant.name}</h5>
        <div className={classes.indent1}>
          {!isNil(memoRappRestaurant.dist)
            ? distance.toFixed(1) + distanceLabel
            : null}
          <br />
          <span>Reviews</span>
          {memoRappRestaurant.usersReviews[0].reviews.map((review: Review, index: number) => {
            return renderMemoRappReview(review, index);
          })}
        </div>
      </div>
    );
  }

  const renderMemoRappRestaurants = () => {

    if (isNil(props.searchResults) || isEmpty(props.searchResults)) {
      return null;
    }

    return (
      <div>
        <h4>MemoRapp Restaurants</h4>
        {(props.searchResults as RestaurantSearchResults).memoRappRestaurants.map((memoRappRestaurant) => {
          return renderMemoRappRestaurant(memoRappRestaurant);
        })}
      </div>
    );
  };

  const renderYelpRestaurants = () => {
    return (
      <div>YelpRestaurants</div>
    );
  };

  const renderRestaurants = () => {
    return (
      <div>
        {renderMemoRappRestaurants()}
        {renderYelpRestaurants()}
      </div>

    )
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Search Results</h3>
        <Tooltip title='Filter'>
          <IconButton
            onClick={handleFilterResults}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {renderSearchTags()}
        {renderRestaurants()}
      </div>
    </HashRouter>
  );

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    id: ownProps.match.params.id,
    searchTags: getSearchTags(state),
    searchResults: getSearchResults(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantResults);
