import { isNil, isEmpty } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Restaurant, RestaurantSearchResults, Review, YelpRestaurant } from '../types';
import {
  getSearchTags,
  getSearchResults,
} from '../selectors';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    block: {
      display: 'block',
    },
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
      <div key={index}>
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

  const getAverageRating = (memoRappRestaurant: Restaurant): string => {
    let ratingSum = 0;
    const numReviews = memoRappRestaurant.usersReviews[0].reviews.length;
    if (numReviews > 0) {
      for (const review of memoRappRestaurant.usersReviews[0].reviews) {
        ratingSum += review.rating;
      }
      return (ratingSum / numReviews).toFixed(1);
    }
    return '';
  };

  const renderDistanceInMeters = (distanceInMeters: number): any => {
    if (isNil(distanceInMeters)) {
      return null;
    }
    let distanceLabel = ' feet away';
    let distance = distanceInMeters * 3.28084;  // meters to feet
    if (distance > (5280 / 2)) {
      distanceLabel = ' miles away';
      distance = distance / 5280;
    }
    // TEDTODO - not always 'current location'
    return (
      'Located ' + distance.toFixed(1) + distanceLabel + ' away from your current location'
    );
  };

  const renderDistance = (memoRappRestaurant: Restaurant): any => {

    if (!isNil(memoRappRestaurant.dist)) {
      return renderDistanceInMeters(memoRappRestaurant.dist.calculated);
    } else {
      return null;
    }
  };

  const renderMemoRappRestaurant = (memoRappRestaurant: Restaurant) => {

    return (
      <div className={classes.indent0} key={memoRappRestaurant.name}>
        <h5>{memoRappRestaurant.name}</h5>
        <div className={classes.indent1}>
          {renderDistance(memoRappRestaurant)}
          <br />
          <div>
            Average rating: {getAverageRating(memoRappRestaurant)}
          </div>
          <br />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <Typography className={classes.heading}>Reviews</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
              {memoRappRestaurant.usersReviews[0].reviews.map((review: Review, index: number) => {
                return renderMemoRappReview(review, index);
              })}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  };

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

  // rating: number
  // distance: in meters
  // address: location.display_address string[]
  // price: string
  const renderYelpRestaurant = (yelpRestaurant: YelpRestaurant) => {
    return (
      <div className={classes.indent0} key={yelpRestaurant.name}>
        <h5>{yelpRestaurant.name}</h5>
        <div className={classes.indent1}>
          <p>Rating: {yelpRestaurant.rating}</p>
          {renderDistanceInMeters(yelpRestaurant.distance)}
          <p>{yelpRestaurant.location.display_address[0]}</p>
          <p>{yelpRestaurant.location.display_address[1]}</p>
          <p>Price: {yelpRestaurant.price}</p>
        </div>
      </div>
    );
  }

  const renderYelpRestaurants = () => {

    if (isNil(props.searchResults) || isEmpty(props.searchResults)) {
      return null;
    }

    return (
      <div>
        <h4>Yelp Restaurants</h4>
        {(props.searchResults as RestaurantSearchResults).yelpRestaurants.map((yelpRestaurant) => {
          return renderYelpRestaurant(yelpRestaurant);
        })}
      </div>
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
