import { Rating } from './rating';

export interface Movie {
    title: string,
    year: number,
    description: string,
    image?: string,
    ratings?: Rating[],
    watched: string,
    dateWatched?: Date,
    id: number
  }