import clsx from 'clsx';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import { getRestaurantByName, getUser } from '../selectors';
import { Restaurant, User, RestaurantReview } from '../types';
import {
  addRestaurant,
  addRestaurantReview,
} from '../controllers';

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
  input: {
    width: 42,
  },
  quarterWidth: {
    width: '25%',
  },
}));

interface AddReviewProps {
  restaurantName: string;
  restaurant: Restaurant | null;
  user: User;
  onAddRestaurant: (restaurant: Restaurant) => any;
  onAddRestaurantReview: (restaurant: Restaurant, restaurantReview: RestaurantReview) => any;
}

const AddReview = (props: AddReviewProps) => {

  const classes = useStyles();

  const [rating, setRating] = React.useState(5.0);
  const [wouldReturn, setWouldReturn] = React.useState(true);
  const [comments, setComments] = React.useState('');

  const handleAddReview = (e: any) => {
    console.log('handleAddReview invoked');

    console.log('user: ', props.user);
    console.log('restaurant name: ', props.restaurantName);
    console.log('rating: ', rating);
    console.log('wouldReturn: ', wouldReturn);
    console.log('comments: ', comments);
    console.log('date: ', new Date().toDateString());

    props.onAddRestaurantReview(
      props.restaurant,
      {
        rating,
        wouldReturn,
        comments,
        date: new Date(),
        userName: props.user.userName,
      });
  };

  const handleWouldReturnChecked = (event: any) => {
    console.log('Would return: ' + event.target.checked);
    setWouldReturn(event.target.checked);
  };

  const handleCommentsChanged = (event: any) => {
    console.log('Comments: ' + event.target.value);
    setComments(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (rating < 0) {
      setRating(0);
    } else if (rating > 10) {
      setRating(10);
    }
  };

  const handleTagChanged = (event: any) => {
    console.log('Tag value: ' + event.target.value);
    // setComments(event.target.value);
  };

  const handleAddTag = (event: any) => {
    console.log('Add new tag');
    // setComments(event.target.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleAddReview(e);
  };

  /*
            <Typography id='input-slider' gutterBottom>
              Rating
            </Typography>
  */

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Add Review</h3>
        <h4>{props.restaurantName}</h4>
        <form noValidate autoComplete='off' onSubmit={onFormSubmit}>

          <div className={classes.quarterWidth}>

            <div>
              <span className={classes.margin}>Tags</span>
              <TextField
                id='outlined-multiline-static'
                variant='outlined'
                onChange={handleTagChanged}
              />
            <Button
              variant='contained'
              className={clsx(classes.margin)}
              onChange={handleAddTag}
              >
              Add Tag
            </Button>
            </div>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <span className={classes.margin}>Rating</span>
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={rating}
                  margin='dense'
                  onChange={handleRatingChange}
                  onBlur={handleBlur}
                  inputProps={{
                    'step': .1,
                    'min': 0,
                    'max': 10,
                    'type': 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={rating}
                  min={0}
                  max={10}
                  step={.1}
                  onChange={handleRatingChange}
                  aria-labelledby='input-slider'
                />
              </Grid>
            </Grid>

            <div>
              <FormControlLabel
                value='end'
                control={
                  <Checkbox
                    color='primary'
                    value={wouldReturn}
                  />}
                label='Would return'
                labelPlacement='end'
                onChange={handleWouldReturnChecked}
              />
            </div>

            <TextField
              id='outlined-multiline-static'
              label='Comments'
              multiline
              rows='4'
              variant='outlined'
              onChange={handleCommentsChanged}
            />

          </div>

          <div>
            <Button
              type='submit'
              variant='contained'
              className={clsx(classes.margin)}
            >
              Add Review
            </Button>
          </div>

        </form>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    restaurantName: ownProps.match.params.restaurantName,
    restaurant: getRestaurantByName(state, ownProps.match.params.restaurantName),
    user: getUser(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onAddRestaurant: addRestaurant,
    onAddRestaurantReview: addRestaurantReview,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
