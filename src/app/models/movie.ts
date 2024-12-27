import { Actor } from './actor';

export interface Movie {
  id?: number;
  title: string;
  releaseDate: Date | string;
  idsActors?: Array<number>;
  actors?: Array<Actor>;
}
