import { Rating } from './rating.model';

export interface Movie {
    title: string,
    year: number,
    description: string,
    image?: string,
    ratings?: Rating[],
    watched: string,
    dateWatched?: Date[],
    liked?: boolean,
    id: number,
    director?: string,
    writer?: string[],
    stars?: string[],
    runtime?: string,
    releaseDate?: string,
    genres?: string,
    budget?: string,
    openingWeekendUSA?: string,
    tags?: string[],
    comments?: string[],
    worldwideGross?: string,
    AFI100LaughsRank?: string
  }