export type MovieRating = 'G' | 'PG' | 'M' | 'MA' | 'R';

export const RATINGS: MovieRating[] = ['G', 'PG', 'M', 'MA', 'R'];

export interface Movie {
  id: number;
  title: string;
  year_released: number;
  rating: MovieRating;
  created_at: string;
  updated_at: string;
}

export interface CreateMovieDto {
  title: string;
  year_released: number;
  rating: MovieRating;
}

export interface UpdateMovieDto {
  title?: string;
  year_released?: number;
  rating?: MovieRating;
}
