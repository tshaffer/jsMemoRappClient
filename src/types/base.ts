export interface MemoRappModelState {
  restaurantsState: RestaurantsState;
  tags: TagEntity[];
  user: User;
}

export interface User {
  userName: string;
  password: string;
  email: string;
}

export interface RestaurantsState {
  selectedRestaurant: Restaurant;
  restaurants: Restaurant[];
}

export interface TagEntity {
  value: string;
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}

export interface Distance {
  calculated: number;
  location: GeoLocation;
}

export interface Review {
  date: Date;
  comments: string;
  rating: number;
  wouldReturn: boolean;
}


export interface UserReviews {
  userName: string;
  tags: TagEntity[];
  reviews: Review[];
}

export interface Restaurant {
  id: string;
  _id: string | null;
  name: string;
  yelpBusinessDetails: any;
  usersReviews: UserReviews[];
  location: GeoLocation;
  dist?: Distance;
}

export interface YelpRestaurant {
  id: string;
  name: string;
  distance: number;
  coordinates: GeoLocation; // doesn't include type
  // many others that I will add as needed
}

export interface RestaurantsResponse {
  success: boolean;
  memoRappRestaurants: Restaurant[];
  yelpRestaurants: YelpRestaurant[];
}