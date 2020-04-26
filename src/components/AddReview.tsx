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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import {
  Restaurant,
  User,
  // RestaurantReview, 
  TagEntity
} from '../types';
import {
  getUser,
  getRestaurantById,
  getMemoRappTagValues,
} from '../selectors';
import {
  createMemoRappRestaurant,
  addReview,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface AddReviewProps {
  restaurant: Restaurant | null;
  user: User;
  tags: string[];
  onCreateMemoRappRestaurant: (restaurant: Restaurant) => any;
  onAddReview: (
    restaurantDbId: string,
    userName: string,
    tags: string[],
    date: Date,
    rating: number,
    wouldReturn: boolean,
    comments: string) => any;
}

const AddReview = (props: AddReviewProps) => {

  const classes = useStyles();

  const [tags, setTags] = React.useState(['']);
  const [currentTag, setCurrentTag] = React.useState('');

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

      // only use non empty tags.

      const tagEntities: TagEntity[] = tags.map((tag) => {
        return {
          value: tag,
        };
      });

      const newRestaurant: Restaurant = {
        id: props.restaurant.id,
        _id: null,
        name: props.restaurant.name,
        yelpBusinessDetails: props.restaurant.yelpBusinessDetails,
        usersReviews: [],
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
  };

  const handleAddReview = (e: any) => {
    console.log('handleAddReview invoked');

    addNewRestaurant(props.restaurant)
      .then((addedRestaurant: Restaurant) => {

        // identifiers for restaurant, user
        const restaurantDbId = addedRestaurant._id;
        const userName = props.user.userName;

        props.onAddReview(
          restaurantDbId,
          userName,
          tags,
          new Date(),
          rating,
          wouldReturn,
          comments,
        );
      });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleAddReview(e);
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

  const handleAddTag = (event: any) => {
    console.log('Add new tag');
    const tagValues: string[] = cloneDeep(tags);
    tagValues.push('');
    setTags(tagValues);
    console.log('number of tags: ', tags.length);
  };

  const handleTagSelected = (event: any) => {

    console.log('handleTagSelected');
    console.log(event.target.value);

    const selectedTagParts: string[] = event.target.value.split('::');
    const tagIndex = parseInt(selectedTagParts[0], 10);
    const tagValue = selectedTagParts[1];
    const tagValues: string[] = cloneDeep(tags);
    tagValues[tagIndex] = tagValue;
    setTags(tagValues);

    console.log('tagValues');
    console.log(tagValues);
  };

  const getTagMenuItems = (parentIndex: string) => {
    const tagItems: any[] = props.tags.map((tagValue: string) => {
      return (
        <MenuItem value={parentIndex.toString() + '::' + tagValue} id={parentIndex}>
          {tagValue}
        </MenuItem>
      );
    });
    return tagItems;
  };

  const getTagSelect = (tag: string, index: number) => {
    return (
      <FormControl className={classes.formControl}>
        <Select
          value={index.toString() + '::' + tags[index]}
          onChange={handleTagSelected}
        >
          <MenuItem value={index.toString() + '::' + ''} id='none'>
            <em>None</em>
          </MenuItem>
          {getTagMenuItems(index.toString())}
        </Select>
      </FormControl>
    );
  };

  const getTags = () => {
    console.log('invoke getTags');
    const existingTags = tags.map((tag, index) => {
      return (
        <div>
          {getTagSelect(tag, index)}
        </div>
      );
    });
    return existingTags;
  };

  const getTagsDiv = () => {
    return (
      <div>
        <span className={classes.margin}>Tags</span>
        {getTags()}
        <Button
          variant='contained'
          className={clsx(classes.margin)}
          onClick={handleAddTag}
          type='button'
        >
          Add Tag
       </Button>
      </div>
    );
  };

  const tagsDiv = getTagsDiv();

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Add Review</h3>
        <h4>{props.restaurant.name}</h4>
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
    restaurant: getRestaurantById(state, ownProps.match.params.id),
    user: getUser(state),
    tags: getMemoRappTagValues(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onCreateMemoRappRestaurant: createMemoRappRestaurant,
    onAddReview: addReview,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
