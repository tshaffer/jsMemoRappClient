// import { isNil } from 'lodash';

// import * as React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import { HashRouter } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';

// import { Link } from '@material-ui/core';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Radio from '@material-ui/core/Radio';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';

// import {
//   RestaurantsResponse,
//   Restaurant
// } from '../types/base';
// import {
//   addRestaurantToRedux,
//   fetchAllRestaurantsByLocation,
//   setSelectedRestaurantInRedux,
// } from '../controllers';
// import {
//   getRestaurants,
//   getSelectedRestaurant
// } from '../selectors';
// import { UserConfiguration } from '../config/config';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '&:hover': {
//         backgroundColor: 'transparent',
//       },
//     },
//     margin: {
//       marginLeft: '42px',
//     },
//     topMargin: {
//       marginTop: '16px',
//     },
//     quarterWidth: {
//       width: '25%',
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       marginTop: '16px',
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }),
// );

// export interface RestaurantReviewProps {
//   restaurants: Restaurant[];
//   onAddRestaurant: (restaurant: Restaurant) => any;
//   onSetSelectedRestaurant: (selectedRestaurant: Restaurant) => any;
//   selectedRestaurant: Restaurant;
// }

// const RestaurantReview = (props: RestaurantReviewProps) => {

//   const classes = useStyles();

//   const [_restaurant, setRestaurant] = React.useState('');
//   const [_restaurantLocation, setRestaurantLocation] = React.useState('specifyLocation');
//   const [_longitude, setLongitude] = React.useState(UserConfiguration.currentLocation.longitude);
//   const [_latitude, setLatitude] = React.useState(UserConfiguration.currentLocation.latitude);

//   const { onAddRestaurant } = props;

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRestaurantLocation(event.target.value);
//   };

//   const handleLongitudeChange = (e: any) => {
//     setLongitude(e.target.value);
//   };

//   const handleLatitudeChange = (e: any) => {
//     setLatitude(e.target.value);
//   };

//   const handleSelectRestaurant = (e: any) => {
//     console.log('handleSelectRestaurant');
//     console.log(e.target.value);
//     setRestaurant(e.target.value);
//     props.onSetSelectedRestaurant(e.target.value);
//   };

//   const handleFindRestaurant = () => {

//     if (_restaurantLocation === 'specifyLocation') {

//       fetchAllRestaurantsByLocation(_latitude, _longitude)
//         .then((restaurantsResponse: RestaurantsResponse) => {

//           if (restaurantsResponse.success) {
//             const addedRestaurantNames: string[] = [];

//             // add memoRappRestaurants
//             for (const memoRappRestaurant of restaurantsResponse.memoRappRestaurants) {
//               const name = memoRappRestaurant.name;
//               onAddRestaurant(memoRappRestaurant);
//               addedRestaurantNames.push(name);
//             }
//             // add yelpRestaurants
//             for (const yelpRestaurant of restaurantsResponse.yelpRestaurants) {
//               const memoRappRestaurant: Restaurant = {
//                 id: yelpRestaurant.id,
//                 _id: null,
//                 name: yelpRestaurant.name,
//                 yelpBusinessDetails: yelpRestaurant,
//                 usersReviews: [],
//                 location: {
//                   type: 'Point',
//                   coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
//                 },
//                 dist: {
//                   calculated: yelpRestaurant.distance,
//                   location: {
//                     type: 'Point',
//                     coordinates: [yelpRestaurant.coordinates.longitude, yelpRestaurant.coordinates.latitude],
//                   }
//                 },
//               };
//               const name = yelpRestaurant.name;
//               if (addedRestaurantNames.indexOf(name) < 0) {
//                 onAddRestaurant(memoRappRestaurant);
//                 addedRestaurantNames.push(name);
//               }
//             }
//           }
//         }).catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   const getRestaurantMenuItems = () => {
//     return props.restaurants.map((restaurantItem) => {
//       const name = restaurantItem.name;
//       return <MenuItem value={restaurantItem as any} key={name}>{name}</MenuItem>;
//     });
//   };

//   const restaurantMenuItems: any[] = getRestaurantMenuItems();

//   console.log(props.selectedRestaurant);

//   return (

//     <HashRouter>
//       <div>
//         <h2>MemoRapp</h2>
//         <h3>Add Restaurant Review</h3>
//         <div className={classes.quarterWidth}>
//           <div>Location of restaurant</div>
//           <div>
//             <Radio
//               checked={_restaurantLocation === 'currentLocation'}
//               onChange={handleChange}
//               value='currentLocation'
//               name='currentLocationRadioButton'
//             />
//             Current Location
//           </div>
//           <div>
//             <Radio
//               checked={_restaurantLocation === 'specifyLocation'}
//               onChange={handleChange}
//               value='specifyLocation'
//               name='specifyLocationRadioButton'
//             />
//             Specify Location
//           </div>
//           <div className={classes.margin}>
//             {(_restaurantLocation === 'currentLocation')
//               ?
//               null
//               :
//               <div>
//                 <div>
//                   <TextField
//                     variant='outlined'
//                     margin='normal'
//                     id='latitude'
//                     label='Latitude'
//                     name='latitude'
//                     autoComplete='latitude'
//                     onChange={handleLatitudeChange}
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     variant='outlined'
//                     margin='normal'
//                     id='longitude'
//                     label='Longitude'
//                     name='longitude'
//                     autoComplete='longitude'
//                     onChange={handleLongitudeChange}
//                   />
//                 </div>
//               </div>
//             }
//           </div>
//           <Button
//             type='button'
//             fullWidth
//             variant='contained'
//             color='primary'
//             onClick={handleFindRestaurant}
//           >
//             Find Restaurant
//           </Button>

//           <div>
//             {(props.restaurants.length === 0)
//               ?
//               null
//               :
//               <div>
//                 <FormControl className={classes.formControl}>
//                   <InputLabel id='demo-simple-select-label'>Restaurants</InputLabel>
//                   <Select
//                     labelId='demo-simple-select-label'
//                     id='demo-simple-select'
//                     value={_restaurant}
//                     onChange={handleSelectRestaurant}
//                   >
//                     {restaurantMenuItems}
//                   </Select>
//                 </FormControl>
//                 {(isNil(props.selectedRestaurant))
//                   ?
//                   null
//                   :
//                   <div>
//                     <Link component={RouterLink} to={'/addReview/' + props.selectedRestaurant.id}>
//                       Add Review
//                     </Link>
//                   </div>
//                 }
//               </div>
//             }
//           </div>
//         </div>
//       </div>
//     </HashRouter>
//   );
// };

// function mapStateToProps(state: any) {
//   return {
//     selectedRestaurant: getSelectedRestaurant(state),
//     restaurants: getRestaurants(state),
//   };
// }

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators({
//     onAddRestaurant: addRestaurantToRedux,
//     onSetSelectedRestaurant: setSelectedRestaurantInRedux,
//   }, dispatch);
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);

import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export interface RestaurantReviewProps {
  poo: string;
}

const RestaurantReview = (props: RestaurantReviewProps) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant='subtitle1' gutterBottom>
        Material-UI Grid:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography variant='subtitle1' gutterBottom>
        CSS Grid Layout:
      </Typography>
      <div className={classes.container}>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper className={classes.paper}>xs=3</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper className={classes.paper}>xs=3</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper className={classes.paper}>xs=3</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper className={classes.paper}>xs=3</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 8' }}>
          <Paper className={classes.paper}>xs=8</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
          <Paper className={classes.paper}>xs=4</Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 12' }}>
          <Paper className={classes.paper}>xs=12</Paper>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(RestaurantReview);
