export interface MemoRappModelState {
  restaurantsState: RestaurantsState;
  tags: TagEntity[];
  user: User;
}

export interface TagEntity {
  value: string;
}

export interface User {
  userName: string;
  password: string;
  email: string;
}

export interface RestaurantSearchResults {
  memoRappRestaurants: any[];
  yelpRestaurants: YelpRestaurant[];
}

export interface RestaurantSearch {
  tags: string[];
  results: RestaurantSearchResults | {};
}

export interface RestaurantsState {
  selectedRestaurant: Restaurant;
  restaurants: Restaurant[];
  search: RestaurantSearch;
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}

export interface GeoLocationSpec {
  coordinates: number[];
  maxDistance: number;
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
  id: string;                   // not in search results - why?
  _id: string | null;           // not in search results - why?
  name: string;
  yelpBusinessDetails: YelpRestaurant;
  usersReviews: UserReviews[];
  location: GeoLocation;
  dist?: Distance;
}

export interface YelpRestaurantCategory {
  alias: string;
  title: string;
}

export interface LatLongPoint {
  latitude: number;
  longitude: number;
}

export interface YelpRestaurant {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  review_count: number;
  categories: YelpRestaurantCategory[];
  rating: number;
  coordinates: LatLongPoint;
  transactions: string[];
  price: string;
  location: {
    // address1, address2, address3, city, zip_code, country, state
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
}

export interface RestaurantsResponse {
  success: boolean;
  memoRappRestaurants: Restaurant[];
  yelpRestaurants: YelpRestaurant[];
}