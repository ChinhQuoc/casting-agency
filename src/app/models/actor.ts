import { Movie } from './movie';

export interface Actor {
  id?: number;
  name: string;
  age: number;
  gender: string;
  idsMovie?: Number[];
  movies?: Movie[];
}
