import clsx from 'clsx';
import { cloneDeep, isNil } from 'lodash';

import * as React from 'react';
import { useState, useEffect } from 'react';

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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui//core/IconButton';

import {
  Restaurant,
  User,
  TagEntity,
  UserReviews
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

  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },

  margin: {
    margin: theme.spacing(1),
  },
  input: {
    width: 42,
  },
  quarterWidth: {
    width: '25%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    display: 'inline',
  },
  inlineDiv: {
    display: 'inline',
  },
  selectControl: {
    minWidth: 96,
  }
}));

interface AddReviewProps {
  restaurant: Restaurant | null;
  user: User;
  allMemoRappTags: string[];
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

  const [_tags, setTags] = useState(['']);

  const [_rating, setRating] = useState(5.0);
  const [_wouldReturn, setWouldReturn] = useState(true);
  const [_comments, setComments] = useState('');

  const [_useEffectInvoked, setUseEffectInvoked] = useState(false);

  useEffect(() => {

    // TEDTODO - is _useEffectInvoked cleared when component is unmounted?
    // TEDTODO - is this the proper approach to achieve what I'm looking for here? i.e., to make
    // TEDTODO - this function analogous to componentDidMount?
    if (!_useEffectInvoked) {

      // alert('AddReview:1');
      console.log('useEffect invoked: _useEffectInvoked = false');

      setUseEffectInvoked(true);
      const restaurant: Restaurant = props.restaurant;
      const usersReviews: UserReviews[] = restaurant.usersReviews;
      for (const usersReview of usersReviews) {
        if (usersReview.userName === props.user.userName) {
          const usersReviewTags: TagEntity[] = usersReview.tags;
          const tagValues: string[] = usersReviewTags.map((tagEntity: TagEntity) => {
            return tagEntity.value;
          });
          setTags(tagValues);
        }
      }
    }
  });

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

      const tagEntities: TagEntity[] = _tags.map((tag) => {
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
          _tags,
          new Date(),
          _rating,
          _wouldReturn,
          _comments,
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
    if (_rating < 0) {
      setRating(0);
    } else if (_rating > 10) {
      setRating(10);
    }
  };

  const handleSliderChange = (event: object, value: number | number[]) => {
    setRating(value as number);
  };

  const handleAddTag = (event: any) => {
    const tagValues: string[] = cloneDeep(_tags);
    tagValues.push('');
    setTags(tagValues);
  };

  const handleRemoveTag = (event: any) => {
    const tagValues: string[] = cloneDeep(_tags);
    tagValues.splice(parseInt(event.currentTarget.id, 10), 1);
    setTags(tagValues);
  };

  const handleTagSelected = (event: any) => {
    const selectedTagParts: string[] = event.target.value.split('::');
    const tagIndex = parseInt(selectedTagParts[0], 10);
    const tagValue = selectedTagParts[1];
    const tagValues: string[] = cloneDeep(_tags);
    tagValues[tagIndex] = tagValue;
    setTags(tagValues);
  };

  const getTagSelectMenuItems = (tagSelectIndex: string) => {
    const tagItems: any[] = props.allMemoRappTags.map((tagValue: string, tagItemIndex: number) => {
      return (
        <MenuItem
          value={tagSelectIndex.toString() + '::' + tagValue}
          key={tagSelectIndex.toString() + '::' + tagItemIndex.toString()}
          id={tagSelectIndex}>
          {tagValue}
        </MenuItem>
      );
    });
    return tagItems;
  };

  const getIconButton = (tagSelectIndex: number, numTags: number) => {
    if (tagSelectIndex < (numTags - 1)) {
      return (
        <IconButton
          id={tagSelectIndex.toString()}
          onClick={handleRemoveTag}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      );
    }
    else {
      return (
        <div className={classes.inlineDiv}>
          <IconButton
            id={tagSelectIndex.toString()}
            onClick={handleAddTag}>
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton
            id={tagSelectIndex.toString()}
            onClick={handleRemoveTag}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </div>
      );
    }
  };

  const getTagSelect = (tagSelectIndex: number, numTags: number) => {
    const selectValue = _tags[tagSelectIndex] === ''
      ? ''
      : tagSelectIndex.toString() + '::' + _tags[tagSelectIndex];
    return (
      <FormControl className={classes.formControl} key={'formControl' + tagSelectIndex.toString()}>
        <Select className={classes.selectControl}
          value={selectValue}
          onChange={handleTagSelected}
          key={'select' + tagSelectIndex.toString()}
        >
          <MenuItem value={tagSelectIndex.toString() + '::' + ''} key={tagSelectIndex.toString() + 'none'} id='none'>
            <em>None</em>
          </MenuItem>
          {getTagSelectMenuItems(tagSelectIndex.toString())}
        </Select>
        {getIconButton(tagSelectIndex, numTags)}

      </FormControl>
    );
  };

  const getTagSelectDivs = () => {
    console.log('invoke getTags');
    const existingTags = _tags.map((_, index) => {
      return (
        <div key={'tagSelectDiv' + index.toString()}>
          {getTagSelect(index, _tags.length)}
        </div>
      );
    });
    return existingTags;
  };

  const getTagsDiv = () => {
    return (
      <div>
        <span className={classes.margin}>Tags</span>
        {getTagSelectDivs()}
      </div>
    );
  };

  const tagsDiv = getTagsDiv();

  console.log('AddReview: invoked');

  /*
            <form noValidate autoComplete='off' onSubmit={onFormSubmit}>

              <div className={classes.quarterWidth}>
  */
  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Add Review</h3>
        <h4>{props.restaurant.name}</h4>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <form noValidate autoComplete='off' onSubmit={onFormSubmit}>

              <div>

                {tagsDiv}

                <Grid container spacing={2} alignItems='center'>
                  <Grid item>
                    <span className={classes.margin}>Rating</span>
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      value={_rating}
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
                      value={_rating}
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
                        value={_wouldReturn}
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
        </div>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    restaurant: getRestaurantById(state, ownProps.match.params.id),
    user: getUser(state),
    allMemoRappTags: getMemoRappTagValues(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onCreateMemoRappRestaurant: createMemoRappRestaurant,
    onAddReview: addReview,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
