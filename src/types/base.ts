export interface MemoRappModelState {
  restaurantsState: RestaurantsState;
  tags: string[];
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

export interface RestaurantReview {
  userName: string;
  date: Date;
  comments: string;
  rating: number;
  wouldReturn: boolean;
}

export interface Distance {
  calculated: number;
  location: GeoLocation;
}

export interface Restaurant {
  _id: string | null;
  restaurantName: string;
  yelpBusinessDetails: any;
  tags: TagEntity[];
  reviews: RestaurantReview[];
  location: GeoLocation;
  dist?: Distance;
}

export interface YelpRestaurant {
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