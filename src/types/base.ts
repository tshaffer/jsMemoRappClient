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
  selectedRestaurant: any;
  restaurants: any[];
}
