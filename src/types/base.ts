export interface MemoRappModelState {
  restaurants: any[];
  tags: string[];
  user: User;
}

export interface User {
  userName: string;
  password: string;
  email: string;
}
