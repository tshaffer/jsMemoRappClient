import clsx from 'clsx';
import { cloneDeep, isNil } from 'lodash';

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

import { 
  Restaurant, 
  User, 
  RestaurantReview, 
  TagEntity 
} from '../types';
import { 
  getRestaurantByName, 
  getUser 
} from '../selectors';
import {
  createMemoRappRestaurant,
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
  onCreateMemoRappRestaurant: (restaurant: Restaurant) => any;
  onAddRestaurantReview: (restaurant: Restaurant, restaurantReview: RestaurantReview) => any;
}

const AddReview = (props: AddReviewProps) => {

  const classes = useStyles();

  const [tags, setTags] = React.useState(['']);
  const [rating, setRating] = React.useState(5.0);
  const [wouldReturn, setWouldReturn] = React.useState(true);
  const [comments, setComments] = React.useState('');

  const isRestaurantInDb = (): boolean => {
    console.log('isNewRestaurant: ');
    console.log(props.restaurant);
    if (isNil(props.restaurant) || props.restaurant._id) {
      return true;
    }
    return false;
  };

  const addNewRestaurant = (existingRestaurant: Restaurant): Promise<any> => {

    if (!isRestaurantInDb()) {
      
      const tagEntities: TagEntity[] = tags.map((tag) => {
        return {
          value: tag,
        };
      });

      const newRestaurant: Restaurant = {
        _id: null,
        restaurantName: props.restaurantName,
        yelpBusinessDetails: props.restaurant.yelpBusinessDetails,
        tags: tagEntities,
        reviews: [],
        location: props.restaurant.location,
      };
      return props.onCreateMemoRappRestaurant(newRestaurant)
        .then((addedRestaurant) => {
          console.log('newRestaurant added');
          console.log(addedRestaurant);
          return Promise.resolve(addedRestaurant);
        });
    }
    return Promise.resolve(existingRestaurant);
  }

  const handleAddReview = (e: any) => {
    console.log('handleAddReview invoked');

    addNewRestaurant(props.restaurant)
      .then((addedRestaurant: Restaurant) => {
        props.onAddRestaurantReview(
          addedRestaurant,
          {
            rating,
            wouldReturn,
            comments,
            date: new Date(),
            userName: props.user.userName,
          });
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

  const handleSliderChange = (event: object, value: number | number[]) => {
    setRating(value as number);
  };

  const handleTagChanged = (event: any) => {
    console.log('handleTagChange, value & id are:');
    console.log(event.target.value);
    console.log(event.target.id);

    const tagValues: string[] = cloneDeep(tags);
    const tagIndex = parseInt(event.target.id, 10);
    tagValues[tagIndex] = event.target.value;
    setTags(tagValues);

    console.log('tagValues');
    console.log(tagValues);
  };

  const handleAddTag = (event: any) => {
    console.log('Add new tag');
    const tagValues: string[] = cloneDeep(tags);
    tagValues.push('');
    setTags(tagValues);
    console.log('number of tags: ', tags.length);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleAddReview(e);
  };

  const getTags = () => {
    console.log('invoke getTags');
    const existingTags = tags.map((tag, index) => {
      return (
        <div>
          <TextField
            id={index.toString()}
            key={index.toString()}
            variant='outlined'
            onChange={handleTagChanged}
            value={tag}
          />
        </div>
      );
    });
    return existingTags;
  };

  const getTagsDiv = (allTagsJsx: any) => {
    if (isRestaurantInDb()) {
      return null;
    }
    return (
      <div>
        <span className={classes.margin}>Tags</span>
        {allTagsJsx}
        <Button
          variant='contained'
          className={clsx(classes.margin)}
          onClick={handleAddTag}
          type='button'
        >
          Add Tag
       </Button>
      </div>
    )
  };

  const allTags = getTags();
  const tagsDiv = getTagsDiv(allTags);

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Add Review</h3>
        <h4>{props.restaurantName}</h4>
        <form noValidate autoComplete='off' onSubmit={onFormSubmit}>

          <div className={classes.quarterWidth}>

            {tagsDiv}

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
                  onChange={handleSliderChange}
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
    onCreateMemoRappRestaurant: createMemoRappRestaurant,
    onAddRestaurantReview: addRestaurantReview,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
