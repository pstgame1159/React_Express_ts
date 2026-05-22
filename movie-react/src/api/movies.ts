import client from './client';
import type { Movie, CreateMovieDto, UpdateMovieDto } from '../types/movie';

interface ApiResponse<ResponseData> {
  success: boolean;
  data: ResponseData;
}

export const fetchMovies = async (): Promise<Movie[]> => {
  const res = await client.get<ApiResponse<Movie[]>>('/movies');
  return res.data.data;
};

export const fetchMovie = async (id: number): Promise<Movie> => {
  const res = await client.get<ApiResponse<Movie>>(`/movies/${id}`);
  return res.data.data;
};

export const createMovieApi = async (dto: CreateMovieDto): Promise<Movie> => {
  const res = await client.post<ApiResponse<Movie>>('/movies', dto);
  return res.data.data;
};

export const updateMovieApi = async (id: number, dto: UpdateMovieDto): Promise<Movie> => {
  const res = await client.put<ApiResponse<Movie>>(`/movies/${id}`, dto);
  return res.data.data;
};

export const deleteMovieApi = async (id: number): Promise<void> => {
  await client.delete(`/movies/${id}`);
};
