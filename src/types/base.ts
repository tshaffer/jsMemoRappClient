export interface MemoRappModelState {
  tags: string[];
  user: User;
}

export interface User {
  userName: string;
  password: string;
  email: string;
}
